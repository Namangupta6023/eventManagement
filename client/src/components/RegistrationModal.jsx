import React, { useState } from 'react';
import { registerForEvent } from '../api';

const RegistrationModal = ({ event, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: '1st Year',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error'

  if (!isOpen || !event) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setStatus({ type: 'error', message: 'Phone number must be at least 10 digits.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await registerForEvent({ ...formData, event_id: event.id });
      setStatus({ type: 'success', message: 'Successfully registered!' });
      setTimeout(() => {
        onClose();
        setStatus({ type: '', message: '' });
        setFormData({ name: '', email: '', college: '', year: '1st Year', phone: '' });
      }, 2000);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={status.type !== 'success' ? onClose : undefined}
      ></div>

      {/* Modal */}
      <div className="bg-navy-800 rounded-2xl w-full max-w-md relative z-10 shadow-2xl border border-navy-600 overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-navy-700 flex justify-between items-center bg-navy-900/50">
          <h3 className="text-xl font-bold text-white truncate pr-4">
            Register for {event.name}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={status.type === 'success'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6">
          {status.type === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-2">Registration Complete!</h4>
              <p className="text-gray-300">You have successfully registered for this event.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.type === 'error' && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {status.message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">College/Institution</label>
                <input 
                  type="text" 
                  name="college" 
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your College Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Year of Study</label>
                  <select 
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    minLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
