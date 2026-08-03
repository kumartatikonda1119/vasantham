const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vasantham');
    console.log('Connected to DB');

    // Remove existing admin if any
    await Admin.deleteMany({});

    const admin = new Admin({
      username: 'geeta@vasantham.com',
      password: 'vasantham123'
    });

    await admin.save();
    console.log('Admin user created: geeta@vasantham.com / vasantham123');

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
