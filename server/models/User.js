import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  rentedCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

export const User = mongoose.model('User', userSchema);