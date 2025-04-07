import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection string is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,  // Increased from 5s to 10s
      socketTimeoutMS: 45000,          // Added socket timeout
      connectTimeoutMS: 10000,         
      maxPoolSize: 10,                
      retryWrites: true,
      w: 'majority'
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // More detailed error logging
    if (error.name === 'MongoNetworkError') {
      console.error('Network error detected. Check your internet connection and firewall settings.');
    }
    process.exit(1);
  }
};

export default connectDB;
