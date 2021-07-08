import mongoose from 'mongoose';

const scannerSchema = new mongoose.Schema(
  {
    id: { type: String },
    sender_id: { type: Number },
    hash_code: { type: String },
    security_digit: { type: String },
    userLoad: { type: String},
    dateLoad: { type: Date },
    userDelivery:  { type: String},
    dateDelivery: { type: Date },
    status : { type: String },
  },
  {
    timestamps: true,
  }
);
const Scanner = mongoose.model('Scanner', scannerSchema);
export default Scanner;