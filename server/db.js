/**
 * db.js — JSON-file based data store
 * Provides a simple persistent store using a JSON file.
 * Exposes a synchronous API compatible with the rest of the codebase.
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'db.json');

// ─── Default seed data ──────────────────────────────────────────────────────
const SEED_EVENTS = [
  { id: 1, name: 'TechXplore 2025', date: '2025-10-15', time: '10:00 AM', venue: 'Seminar Hall A', description: 'Annual technical symposium featuring workshops on AI, Machine Learning, and Web Development. Compete in hackathons and win exciting prizes worth Rs.50,000!', category: 'Technical', image_url: null, is_featured: 1, created_at: new Date().toISOString() },
  { id: 2, name: 'Code Sprint 3.0', date: '2025-10-22', time: '09:00 AM', venue: 'Computer Lab 3 & 4', description: 'A 6-hour competitive coding challenge for all programming enthusiasts. Problems range from beginner to expert level across Data Structures, Algorithms, and more.', category: 'Technical', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
  { id: 3, name: 'Harmony Fest', date: '2025-11-01', time: '05:00 PM', venue: 'Open Air Amphitheatre', description: 'A vibrant cultural extravaganza celebrating art, music, dance, and drama. Solo and group performances welcome from all branches.', category: 'Cultural', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
  { id: 4, name: 'Startup Pitch Day', date: '2025-11-08', time: '11:00 AM', venue: 'Innovation Center', description: 'Pitch your startup idea to a panel of industry mentors and investors. Top 3 teams receive incubation support and seed funding of up to Rs.1,00,000.', category: 'Workshop', image_url: null, is_featured: 1, created_at: new Date().toISOString() },
  { id: 5, name: 'Inter-College Sports Meet', date: '2025-11-15', time: '08:00 AM', venue: 'Sports Complex', description: 'Annual sports competition featuring cricket, football, basketball, volleyball, and athletics. Register your team and compete for the Champion Trophy!', category: 'Sports', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
  { id: 6, name: 'UI/UX Design Workshop', date: '2025-11-20', time: '02:00 PM', venue: 'Design Lab', description: 'Hands-on workshop covering Figma, design principles, user research, and prototyping. Beginners and intermediate designers welcome. Certificate provided.', category: 'Workshop', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
  { id: 7, name: 'Battle of Bands', date: '2025-12-05', time: '06:00 PM', venue: 'College Auditorium', description: 'Show off your musical talent at the biggest stage in the city. Solo artists and bands can register. Genres: Rock, Pop, Classical, Fusion.', category: 'Cultural', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
  { id: 8, name: 'Cloud Computing Bootcamp', date: '2025-12-12', time: '09:30 AM', venue: 'Seminar Hall B', description: 'A full-day bootcamp on AWS, Azure, and GCP fundamentals. Includes hands-on labs, real project deployment, and interview prep tips.', category: 'Technical', image_url: null, is_featured: 0, created_at: new Date().toISOString() },
];

// ─── Load or initialise store ──────────────────────────────────────────────
function loadStore() {
  if (fs.existsSync(dbPath)) {
    try {
      return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch {
      // Corrupted file — reset
    }
  }
  const store = { events: SEED_EVENTS, registrations: [], nextEventId: 9, nextRegId: 1 };
  saveStore(store);
  console.log('Database initialised and seeded with 8 events.');
  return store;
}

function saveStore(store) {
  fs.writeFileSync(dbPath, JSON.stringify(store, null, 2), 'utf8');
}

let store = loadStore();

// ─── Public API ─────────────────────────────────────────────────────────────
const db = {
  // Events
  getEvents({ search, category } = {}) {
    let events = [...store.events];
    if (search) events = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    if (category) events = events.filter(e => e.category === category);
    return events.sort((a, b) => a.date.localeCompare(b.date));
  },

  getEventById(id) {
    return store.events.find(e => e.id === Number(id)) || null;
  },

  createEvent(data) {
    const event = {
      id: store.nextEventId++,
      name: data.name,
      date: data.date,
      time: data.time,
      venue: data.venue,
      description: data.description,
      category: data.category,
      image_url: data.image_url || null,
      is_featured: data.is_featured ? 1 : 0,
      created_at: new Date().toISOString(),
    };
    store.events.push(event);
    saveStore(store);
    return event;
  },

  updateEvent(id, data) {
    const idx = store.events.findIndex(e => e.id === Number(id));
    if (idx === -1) return null;
    store.events[idx] = {
      ...store.events[idx],
      name: data.name,
      date: data.date,
      time: data.time,
      venue: data.venue,
      description: data.description,
      category: data.category,
      image_url: data.image_url || null,
      is_featured: data.is_featured ? 1 : 0,
    };
    saveStore(store);
    return store.events[idx];
  },

  deleteEvent(id) {
    const idx = store.events.findIndex(e => e.id === Number(id));
    if (idx === -1) return false;
    store.events.splice(idx, 1);
    store.registrations = store.registrations.filter(r => r.event_id !== Number(id));
    saveStore(store);
    return true;
  },

  // Registrations
  getRegistrations({ search, event_id } = {}) {
    let regs = store.registrations.map(r => {
      const event = store.events.find(e => e.id === r.event_id);
      return { ...r, event_name: event ? event.name : 'Unknown Event' };
    });
    if (search) {
      const q = search.toLowerCase();
      regs = regs.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q));
    }
    if (event_id) regs = regs.filter(r => r.event_id === Number(event_id));
    return regs.sort((a, b) => new Date(b.registered_at) - new Date(a.registered_at));
  },

  createRegistration(data) {
    const reg = {
      id: store.nextRegId++,
      event_id: Number(data.event_id),
      name: data.name,
      email: data.email,
      college: data.college,
      year: data.year,
      phone: data.phone,
      registered_at: new Date().toISOString(),
    };
    store.registrations.push(reg);
    saveStore(store);
    return reg;
  },
};

module.exports = db;
