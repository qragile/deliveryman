import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { generateToken, isAdmin, isAuth } from '../utils.js';
import dotenv from 'dotenv';
import Callback from '../models/callbackModel.js';

dotenv.config();
const meliRouter = express.Router();
meliRouter.get('/sincroniza',expressAsyncHandler(async (req, res, next) => {
    const code = req.query['code'];
  if (code) {
      process.env.CODE = code;
      const createdUsers =  "pasoooooo";
      res.status(401).send({ message: createdUsers });
      res.redirect('');
    } else {
        const error = req.query['error'];
        const error_description = req.query['error_description'];
        res.status(401).send({ message: error + ' ' + error_description });
    }
    //const createdUsers = await User.insertMany(data.users);
  })
  );
  meliRouter.post('/callbacks',expressAsyncHandler(async (req, res, next) => {
   
    const resource = req.body.resource;
    if (resource) {
        const callback = new Callback({
         resource: req.body.resource,
         user_id: req.body.user_id,
         topic: req.body.topic,
         application_id: req.body.application_id,
         attempts: req.body.attempts,
         sent: req.body.sent,
         received: req.body.received,
        })
        const createdCallback = await callback.save();
        res.status(200).send({message: 'Ok'});     
   } else {
        res.status(401).send({ message: 'NO OK' + resource  });
    }
    //const createdUsers = await User.insertMany(data.users);
  })
  );
export default meliRouter;