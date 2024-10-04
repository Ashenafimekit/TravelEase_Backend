require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const defaultAdmin = new User({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        role: 'admin',
      });

      await defaultAdmin.save();
      console.log(`Default admin created with username: ${process.env.ADMIN_USERNAME}`);
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

module.exports = createDefaultAdmin;
