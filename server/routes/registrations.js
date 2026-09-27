const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/registrations — register a student
router.post('/', (req, res) => {
  try {
    const { event_id, name, email, college, year, phone } = req.body;
    if (!event_id || !name || !email || !college || !year || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const event = db.getEventById(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const registration = db.createRegistration({ event_id, name, email, college, year, phone });
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/registrations — list all (admin)
router.get('/', authMiddleware, (req, res) => {
  try {
    const { search, event_id } = req.query;
    const registrations = db.getRegistrations({ search, event_id });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
