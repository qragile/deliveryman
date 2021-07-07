import express from 'express';
import Scanner from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const scanners = await Scanner.find({}).populate('user');
  res.send(scanners);
});
router.get("/mine", isAuth, async (req, res) => {
  const scanners = await Scanner.find({ user: req.user._id });
  res.send(scanners);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Scanner.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Scanner Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Scanner.findOne({ _id: req.params.id });
  if (order) {
    const deletedScanner = await order.remove();
    res.send(deletedScanner);
  } else {
    res.status(404).send("Scanner Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  const newScanner = new Scanner({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newScannerCreated = await newScanner.save();
  res.status(201).send({ message: "New Scanner Created", data: newScannerCreated });
});

router.post("/head", isAuth, async (req, res) => {
  const newScanner = new Scanner({
    orderHead: req.body.orderHead,
  });
  const newScannerCreated = await newScanner.save();
  res.status(201).send({ message: "New Scanner Created", data: newScannerCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Scanner.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedScanner = await order.save();
    res.send({ message: 'Scanner Paid.', order: updatedScanner });
  } else {
    res.status(404).send({ message: 'Scanner not found.' })
  }
});

export default router;