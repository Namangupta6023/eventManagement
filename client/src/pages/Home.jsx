import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../api';
import EventCard from '../components/EventCard';
import FeaturedEvent from '../components/FeaturedEvent';
import RegistrationModal from '../components/RegistrationModal';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data } = await getEvents();
        
        // Filter featured events
        const featured = data.filter(e => e.is_featured === 1).slice(0, 2);
        setFeaturedEvents(featured);
        
        // Filter upcoming (for now just take some non-featured or all)
        const upcoming = data.slice(0, 3);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error fetching home events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-[#1e1b4b]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">ClubHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your one-stop platform for all college club events, workshops, and activities. Discover, register, and participate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/25 transition-transform hover:scale-105">
              Explore Events
            </Link>
            <a href="#about" className="px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/20 hover:bg-white/10 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-navy-900 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Our Clubs</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-navy-800 p-8 rounded-2xl border border-navy-700 text-center hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Technical Club</h3>
              <p className="text-gray-400">Innovation & Technology. Join for coding, hackathons, and tech talks.</p>
            </div>
            <div className="bg-navy-800 p-8 rounded-2xl border border-navy-700 text-center hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-xl font-bold mb-2">Cultural Club</h3>
              <p className="text-gray-400">Arts & Expression. Dance, music, drama, and fine arts events.</p>
            </div>
            <div className="bg-navy-800 p-8 rounded-2xl border border-navy-700 text-center hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-xl font-bold mb-2">Sports Club</h3>
              <p className="text-gray-400">Fitness & Competition. Tournaments, intramurals, and wellness.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-900/40 to-navy-800 p-6 rounded-xl border border-blue-500/20 text-center">
              <div className="text-3xl font-extrabold text-blue-400 mb-1">50+</div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">Events/Year</div>
            </div>
            <div className="bg-gradient-to-br from-violet-900/40 to-navy-800 p-6 rounded-xl border border-violet-500/20 text-center">
              <div className="text-3xl font-extrabold text-violet-400 mb-1">2000+</div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">Students</div>
            </div>
            <div className="bg-gradient-to-br from-pink-900/40 to-navy-800 p-6 rounded-xl border border-pink-500/20 text-center">
              <div className="text-3xl font-extrabold text-pink-400 mb-1">15+</div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">Active Clubs</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/40 to-navy-800 p-6 rounded-xl border border-emerald-500/20 text-center">
              <div className="text-3xl font-extrabold text-emerald-400 mb-1">5</div>
              <div className="text-sm text-gray-300 font-medium uppercase tracking-wider">Years Running</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-24 bg-navy-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
              <div className="w-24 h-1 bg-violet-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {featuredEvents.map(event => (
                <FeaturedEvent key={event.id} event={event} onRegister={handleRegister} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
              <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
            </div>
            <Link to="/events" className="hidden md:inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              View All Events
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} onRegister={handleRegister} />
                ))}
              </div>
              <div className="text-center md:hidden mt-8">
                <Link to="/events" className="inline-flex items-center gap-2 text-blue-400 font-medium">
                  View All Events →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={selectedEvent} 
      />
    </div>
  );
};

export default Home;
