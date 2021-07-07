import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema(
  {
    resource: { type: String},
    user_id: { type: String},
    topic: { type: String},
    application_id: { type: String},
    attempts: { type: String},
    sent: { type: String},
    received: { type: String},
  },
  {
    timestamps: true,
  }
);
const Callback = mongoose.model('Callback', callbackSchema);
export default Callback;