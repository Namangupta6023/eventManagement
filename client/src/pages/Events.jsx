import React, { useState, useEffect } from 'react';
import { getEvents } from '../api';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/RegistrationModal';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop'];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // API handles search and category
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (category && category !== 'All') params.category = category;
        
        const { data } = await getEvents(params);
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, category]);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Events</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and participate in various club activities happening across the campus.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-navy-800 p-4 md:p-6 rounded-2xl border border-navy-700">
          
          <div className="w-full md:w-96 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search events by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-900 border border-navy-600 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                  (category === cat || (cat === 'All' && !category))
                    ? 'bg-blue-600 text-white'
                    : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-navy-800 rounded-xl h-96 animate-pulse border border-navy-700"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-navy-800 rounded-2xl border border-navy-700">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} onRegister={handleRegister} />
            ))}
          </div>
        )}

      </div>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={selectedEvent} 
      />
    </div>
  );
};

export default Events;
