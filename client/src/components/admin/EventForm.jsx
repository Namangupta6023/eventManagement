import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../../api';

const EventForm = ({ event, onSubmit, onClose, token }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    category: 'Technical',
    is_featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        date: event.date ? event.date.split('T')[0] : '',
        time: event.time || '',
        venue: event.venue || '',
        description: event.description || '',
        category: event.category || 'Technical',
        is_featured: !!event.is_featured
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit = {
        ...formData,
        is_featured: formData.is_featured ? 1 : 0
      };

      if (event && event.id) {
        await updateEvent(event.id, dataToSubmit, token);
      } else {
        await createEvent(dataToSubmit, token);
      }
      onSubmit(); // refresh parent
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-navy-800 rounded-xl w-full max-w-2xl relative z-10 shadow-2xl border border-navy-700 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-navy-700 flex justify-between items-center sticky top-0 bg-navy-800 z-20">
          <h2 className="text-2xl font-bold text-white">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Event Name</label>
            <input 
              type="text" name="name" required value={formData.name} onChange={handleChange}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Hackathon 2025"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input 
                type="date" name="date" required value={formData.date} onChange={handleChange}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input 
                type="time" name="time" required value={formData.time} onChange={handleChange}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Venue</label>
              <input 
                type="text" name="venue" required value={formData.venue} onChange={handleChange}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Main Auditorium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea 
              name="description" required rows="4" value={formData.description} onChange={handleChange}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the event..."
            ></textarea>
          </div>

          <div className="flex items-center gap-3 bg-navy-900/50 p-4 rounded-lg border border-navy-700">
            <input 
              type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 bg-navy-800"
            />
            <label htmlFor="is_featured" className="text-white font-medium cursor-pointer flex-1">
              Mark as Featured Event
              <p className="text-xs text-gray-400 font-normal mt-0.5">Featured events appear highlighted on the home page.</p>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-navy-700">
            <button 
              type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-navy-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" disabled={loading}
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center min-w-[120px]"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
