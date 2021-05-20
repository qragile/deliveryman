import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Delivery from '../models/deliveryModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payDeliveryEmailTemplate,
} from '../utils.js';

const deliveryRouter = express.Router();
deliveryRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const deliverys = await Delivery.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
    res.send(deliverys);
  })
);

deliveryRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deliverys = await Delivery.aggregate([
      {
        $group: {
          _id: null,
          numDeliverys: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyDeliverys = await Delivery.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          deliverys: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, deliverys, dailyDeliverys, productCategories });
  })
);

deliveryRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deliverys = await Delivery.find({ user: req.user._id });
    res.send(deliverys);
  })
);

deliveryRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.deliveryItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const delivery = new Delivery({
        seller: req.body.deliveryItems[0].seller,
        deliveryItems: req.body.deliveryItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdDelivery = await delivery.save();
      res
        .status(201)
        .send({ message: 'New Delivery Created', delivery: createdDelivery });
    }
  })
);

deliveryRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const delivery = await Delivery.findById(req.params.id);
    if (delivery) {
      res.send(delivery);
    } else {
      res.status(404).send({ message: 'Delivery Not Found' });
    }
  })
);

deliveryRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const delivery = await Delivery.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (delivery) {
      delivery.isPaid = true;
      delivery.paidAt = Date.now();
      delivery.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedDelivery = await delivery.save();
      mailgun()
        .messages()
        .send(
          {
            from: 'Ecovoy <ecovoy40@ecovoy.com.ve>',
            to: `${delivery.user.name} <${delivery.user.email}>`,
            subject: `New delivery ${delivery._id}`,
            html: payDeliveryEmailTemplate(delivery),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
      res.send({ message: 'Delivery Paid', delivery: updatedDelivery });
    } else {
      res.status(404).send({ message: 'Delivery Not Found' });
    }
  })
);

deliveryRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const delivery = await Delivery.findById(req.params.id);
    if (delivery) {
      const deleteDelivery = await delivery.remove();
      res.send({ message: 'Delivery Deleted', delivery: deleteDelivery });
    } else {
      res.status(404).send({ message: 'Delivery Not Found' });
    }
  })
);

deliveryRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const delivery = await Delivery.findById(req.params.id);
    if (delivery) {
      delivery.isDelivered = true;
      delivery.deliveredAt = Date.now();

      const updatedDelivery = await delivery.save();
      res.send({ message: 'Delivery Delivered', delivery: updatedDelivery });
    } else {
      res.status(404).send({ message: 'Delivery Not Found' });
    }
  })
);

export default deliveryRouter;