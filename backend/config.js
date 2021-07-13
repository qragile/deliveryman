import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://qragile:Q1p01w2o92**@clusterURI.mongodb.net/database',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',

  
  GrantType :  process.env.GRANTTYPE || 'authorization_code',
  App_ID : process.env.APP_ID || '5225164571673572',
  Secret_Key : process.env.SECRET_KEY || 'GXdnkvgv1Pqm5gLTGXaV7LHASCrOCy9I',
  Redirect_URI: process.env.REDIRECT_URI || 'https://hidden-meadow-74120.herokuapp.com/api/melis/callbacks',
  CODE: process.env.CODE || '*',
  AccessToken: process.env.ACCESS_TOKEN || 'AccessToken',
  Client_Id : process.env.CLIENT_ID || '5225164571673572',
  RefreshToken: process.env.REFRESHTOKEN || 'Client_Id',
  AuthCODE : process.env.AUTHCODE || 'Code response MELI',
};
