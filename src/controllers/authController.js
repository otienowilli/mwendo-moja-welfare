const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = require('../models/User');
const { validatePassword } = require('../utils/passwordValidator');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Allow login with either username or email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email: username }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_active) {
      return res.status(401).json({ error: 'User account is inactive' });
    }

    // Compare password directly using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, full_name, role } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        requirements: passwordValidation.errors
      });
    }

    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password before creating user
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password_hash,
      full_name,
      role: role || 'secretary',
      is_active: true,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Token expires in 1 hour
    const expiresIn = new Date(Date.now() + 60 * 60 * 1000);

    await user.update({
      password_reset_token: resetTokenHash,
      password_reset_expires: expiresIn,
    });

    // In production, send email with reset link
    // For now, return the token (in production, never do this)
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/reset-password/${resetToken}`;

    res.status(200).json({
      message: 'Password reset link has been sent to your email',
      // Remove this in production - only for testing
      resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    // Validate new password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        requirements: passwordValidation.errors,
      });
    }

    // Hash the token to compare with stored hash
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      where: {
        password_reset_token: resetTokenHash,
        password_reset_expires: {
          [require('sequelize').Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    await user.update({
      password_hash,
      password_reset_token: null,
      password_reset_expires: null,
    });

    res.status(200).json({
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.user; // From auth middleware
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Validate new password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: 'New password does not meet requirements',
        requirements: passwordValidation.errors,
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await user.update({ password_hash });

    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, forgotPassword, resetPassword, changePassword };

