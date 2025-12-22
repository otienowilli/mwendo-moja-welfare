const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_active) {
      return res.status(401).json({ error: 'User account is inactive' });
    }

    const isPasswordValid = await user.comparePassword(password);

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

module.exports = { login, register };

