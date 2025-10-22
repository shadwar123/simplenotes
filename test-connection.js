const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'your-connection-string-here';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    await mongoose.disconnect();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
  }
}

testConnection();
