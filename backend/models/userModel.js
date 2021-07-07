import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    license:{ type: String},
    acountNumber:{ type: String},
    name: { type: String, required: true },
    nickName: { type: String, required: true },    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isDelivery: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    isMeli: { type: Boolean, default: false, required: true },
    isAct: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
    delivery: {
      shipping_code: String,
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;