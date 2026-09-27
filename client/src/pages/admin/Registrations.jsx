import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { getRegistrations, getEvents } from '../../api';
import { useAuth } from '../../context/AuthContext';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventId, setEventId] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    // fetch events for the filter dropdown
    const fetchEventList = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEventList();
  }, []);

  useEffect(() => {
    const fetchRegs = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (eventId) params.event_id = eventId;

        const { data } = await getRegistrations(params, token);
        setRegistrations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const delayDebounce = setTimeout(() => {
      fetchRegs();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, eventId, token]);

  return (
    <div className="flex min-h-screen pt-20 bg-navy-900">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Student Registrations</h1>
          <p className="text-gray-400 mt-2">Total registrations: <span className="text-white font-bold">{registrations.length}</span></p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          >
            <option value="">All Events</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>{ev.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Student Info</th>
                  <th className="px-6 py-4 font-medium">Academic Details</th>
                  <th className="px-6 py-4 font-medium">Event</th>
                  <th className="px-6 py-4 font-medium">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  registrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-navy-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{reg.name}</div>
                        <div className="text-gray-400">{reg.email}</div>
                        <div className="text-gray-500 text-xs mt-1">{reg.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">{reg.college}</div>
                        <div className="text-gray-500 text-xs">{reg.year}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {reg.event_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(reg.created_at).toLocaleString('en-US', { 
                          year: 'numeric', month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registrations;
