const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({
      message: 'Login successful',
      token: token
    });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
};

module.exports = { login };