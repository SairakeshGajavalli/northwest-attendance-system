import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User, initializeAdmin } from './models/User.js';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key';

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.mx7vi.mongodb.net/AMS?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

// Enhanced MongoDB connection with more detailed logging
const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');

  try {
    // More verbose debug logging
    mongoose.set('debug', true);

    mongoose.connection.on('connecting', () => {
      console.log('⏳ Initiating MongoDB connection...');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ Successfully connected to MongoDB');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('❌ Disconnected from MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      waitQueueTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
    });

    console.log('=== MongoDB Connection Details ===');
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Port: ${conn.connection.port}`);
    console.log('================================');
    
    // Initialize admin user
    await initializeAdmin();
  } catch (error) {
    console.error('=== MongoDB Connection Error ===');
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Stack Trace:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
    console.error('==============================');
    process.exit(1);
  }
};

// Connect to MongoDB Atlas
connectDB().catch(console.error);

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, role });
    
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password)) || user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials or role' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user.userId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoStatus = {
    readyState: mongoose.connection.readyState,
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };

  res.json({
    status: 'ok',
    mongodb: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});