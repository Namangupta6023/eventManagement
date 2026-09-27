import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { getEvents, getRegistrations } from '../../api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    featuredEvents: 0,
    upcomingEvents: 0
  });
  const [recentRegs, setRecentRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsRes, regsRes] = await Promise.all([
          getEvents(),
          getRegistrations({}, token)
        ]);
        
        const events = eventsRes.data;
        const regs = regsRes.data;

        const today = new Date().toISOString().split('T')[0];
        
        setStats({
          totalEvents: events.length,
          totalRegistrations: regs.length,
          featuredEvents: events.filter(e => e.is_featured === 1).length,
          upcomingEvents: events.filter(e => e.date >= today).length
        });

        setRecentRegs(regs.slice(0, 5)); // Just take first 5 assuming API returns sorted
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-screen pt-20">
        <AdminSidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-20 bg-navy-900">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back to the Admin Portal.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/admin/events" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
              + Add Event
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">🎉</div>
            <div>
              <div className="text-sm text-gray-400 font-medium">Total Events</div>
              <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
            </div>
          </div>
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">👥</div>
            <div>
              <div className="text-sm text-gray-400 font-medium">Registrations</div>
              <div className="text-2xl font-bold text-white">{stats.totalRegistrations}</div>
            </div>
          </div>
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-2xl">⭐</div>
            <div>
              <div className="text-sm text-gray-400 font-medium">Featured Events</div>
              <div className="text-2xl font-bold text-white">{stats.featuredEvents}</div>
            </div>
          </div>
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-2xl">📅</div>
            <div>
              <div className="text-sm text-gray-400 font-medium">Upcoming</div>
              <div className="text-2xl font-bold text-white">{stats.upcomingEvents}</div>
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-navy-700 flex justify-between items-center bg-navy-800">
            <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
            <Link to="/admin/registrations" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Event</th>
                  <th className="px-6 py-4 font-medium">College</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700 text-sm">
                {recentRegs.map(reg => (
                  <tr key={reg.id} className="hover:bg-navy-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{reg.name}</div>
                      <div className="text-gray-400 text-xs">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{reg.event_name}</td>
                    <td className="px-6 py-4 text-gray-300">{reg.college}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(reg.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentRegs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
