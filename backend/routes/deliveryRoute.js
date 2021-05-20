import express from 'express';
import Delivery from '../models/deliveryModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const deliverys = await Delivery.find({}).populate('user');
  res.send(deliverys);
});
router.get("/mine", isAuth, async (req, res) => {
  const deliverys = await Delivery.find({ user: req.user._id });
  res.send(deliverys);
});

router.get("/:id", isAuth, async (req, res) => {
  const delivery = await Delivery.findOne({ _id: req.params.id });
  if (delivery) {
    res.send(delivery);
  } else {
    res.status(404).send("Delivery Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const delivery = await Delivery.findOne({ _id: req.params.id });
  if (delivery) {
    const deletedDelivery = await delivery.remove();
    res.send(deletedDelivery);
  } else {
    res.status(404).send("Delivery Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newDelivery = new Delivery({
    deliveryItems: req.body.deliveryItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newDeliveryCreated = await newDelivery.save();
  res.status(201).send({ message: "New Delivery Created", data: newDeliveryCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  if (delivery) {
    delivery.isPaid = true;
    delivery.paidAt = Date.now();
    delivery.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        deliveryID: req.body.deliveryID,
        paymentID: req.body.paymentID
      }
    }
    const updatedDelivery = await delivery.save();
    res.send({ message: 'Delivery Paid.', delivery: updatedDelivery });
  } else {
    res.status(404).send({ message: 'Delivery not found.' })
  }
});

export default router;