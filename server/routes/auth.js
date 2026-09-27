const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = 'club_events_jwt_secret_2025';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'clubadmin2025') {
    const payload = { username: 'admin', role: 'admin' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user: payload });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
