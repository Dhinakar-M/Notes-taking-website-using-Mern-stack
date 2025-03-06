import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: String,
  model: String,
  year: Number,
  price: Number,
  image: String,
  available: { type: Boolean, default: true },
  rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Car = mongoose.model('Car', carSchema);