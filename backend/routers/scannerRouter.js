import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Scanner from '../models/scannerModel.js';
import dotenv from 'dotenv';
import {
  isAdmin,
  isAuth,
  isDelivery,
  mailgun,
  payOrderEmailTemplate,
} from '../utils.js';

dotenv.config();
const scannerRouter = express.Router();
scannerRouter.get('/',isAuth,isDelivery,expressAsyncHandler(async (req, res) => {
    const scanners = await Scanner.find({});
    res.send(scanners);
  })
);
scannerRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const scanners = await Scanner.find({ user: req.user._id });
    res.send(scanners);
  })
);


scannerRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const scanner = await Scanner.findOne({ id: req.body.id });
    if (!scanner) {
      const scanner = new Scanner({
        id: req.body.id,
        sender_id: req.body.sender_id,
        hash_code: req.body.hash_code,
        security_digit: req.body.security_digit,
        userLoad: req.body.userLoad,
        dateLoad: req.body.dateLoad,
        userDelivery: req.body.userDelivery,
        dateDelivery: req.body.dateDelivery,
        
      });
      const createScanner = await scanner.save();
      res
        .status(201)
        .send({ message: 'New Load Created', scanner: createScanner });
    } else {
      res
        .status(500)
        .send({ message: 'Scanner found. try Next ' });
    }
  })
);

scannerRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const scanner = await Scanner.findById(req.params.id);
    if (scanner) {
      res.send(scanner);
    } else {
      res.status(404).send({ message: 'Scanner Not Found' });
    }
  })
);



scannerRouter.delete(
  '/:id',
  isAuth,
  isDelivery,
  expressAsyncHandler(async (req, res) => {
    const scanner = await Scanner.findById(req.params.id);
    if (scanner) {
      const deleteScanner = await scanner.remove();
      res.send({ message: 'Scanner Deleted', scanner: deleteScanner });
    } else {
      res.status(404).send({ message: 'Scanner Not Found' });
    }
  })
);


export default scannerRouter;