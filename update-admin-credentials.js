#!/usr/bin/env node

/**
 * Script to update admin user credentials
 * Usage: node update-admin-credentials.js
 */

const bcrypt = require('bcryptjs');
const sequelize = require('./src/config/database');
const User = require('./src/models/User');

const updateAdminCredentials = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // New admin credentials
    const newEmail = 'gregorykundu@gmail.com';
    const newPassword = 'kundu@mwendo2024';

    console.log('\n📝 Updating admin credentials...');
    console.log(`   Email: ${newEmail}`);
    console.log(`   Password: ${newPassword}`);

    // Find admin user
    const adminUser = await User.findOne({
      where: { role: 'admin' }
    });

    if (!adminUser) {
      console.log('❌ No admin user found in database');
      console.log('\n📌 Creating new admin user...');

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(newPassword, salt);

      // Create admin user
      const newAdmin = await User.create({
        username: 'gregorykundu',
        email: newEmail,
        password_hash,
        full_name: 'Gregory Kundu',
        role: 'admin',
        is_active: true
      });

      console.log('✅ Admin user created successfully!');
      console.log(`   ID: ${newAdmin.id}`);
      console.log(`   Username: ${newAdmin.username}`);
      console.log(`   Email: ${newAdmin.email}`);
      console.log(`   Role: ${newAdmin.role}`);
    } else {
      console.log(`\n📌 Found existing admin user: ${adminUser.username}`);

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(newPassword, salt);

      // Update admin user
      await adminUser.update({
        email: newEmail,
        password_hash,
        username: 'gregorykundu'
      });

      console.log('✅ Admin credentials updated successfully!');
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${newEmail}`);
      console.log(`   Password: ${newPassword}`);
    }

    console.log('\n✅ Update complete!');
    console.log('\n📌 Login with:');
    console.log(`   Email/Username: gregorykundu or ${newEmail}`);
    console.log(`   Password: ${newPassword}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the update
updateAdminCredentials();

