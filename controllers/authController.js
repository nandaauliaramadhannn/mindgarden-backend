const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

// ✅ Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek email sudah ada
    const existing = await db.User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      role: 'user'
    });

    await sendVerificationEmail(user);

    res.status(201).json({
      message: 'Registration successful. Please check your email for verification link.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

// ✅ Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Incorrect password' });

    if (!user.emailVerified) {
      return res.status(403).json({ message: 'Please verify your email before login' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// ✅ Verifikasi Email dari Token
const verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.emailVerified) {
      return res.json({ message: 'Email already verified' });
    }

    user.emailVerified = true;
    await user.save();

    res.json({ message: 'Email successfully verified' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token', error: err.message });
  }
};

// ✅ Kirim Ulang Link Verifikasi
const resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    await sendVerificationEmail(user);

    res.json({ message: 'Verification email sent again. Please check your inbox.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to resend verification', error: err.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification
};
