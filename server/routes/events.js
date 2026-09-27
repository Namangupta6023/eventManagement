const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/events?search=&category=
router.get('/', (req, res) => {
  try {
    const { search, category } = req.query;
    const events = db.getEvents({ search, category });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  try {
    const event = db.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/events  (admin)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, date, time, venue, description, category, image_url, is_featured } = req.body;
    if (!name || !date || !time || !venue || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const event = db.createEvent({ name, date, time, venue, description, category, image_url, is_featured });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/events/:id  (admin)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { name, date, time, venue, description, category, image_url, is_featured } = req.body;
    if (!name || !date || !time || !venue || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const event = db.updateEvent(req.params.id, { name, date, time, venue, description, category, image_url, is_featured });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/events/:id  (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const deleted = db.deleteEvent(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event and related registrations deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
