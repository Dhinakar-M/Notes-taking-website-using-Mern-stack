import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { User } from './models/User.js';
import { Car } from './models/Car.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/car-rental');

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('rentedCars');
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find().populate('rentedBy');
    res.json(cars);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/cars/rent/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const car = await Car.findById(req.params.id);
    const user = await User.findById(userId);

    if (!car.available) {
      return res.status(400).json({ error: 'Car is not available' });
    }

    car.available = false;
    car.rentedBy = userId;
    await car.save();

    user.rentedCars.push(car._id);
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});