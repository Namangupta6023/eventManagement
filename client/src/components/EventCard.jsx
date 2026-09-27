import React from 'react';

const EventCard = ({ event, onRegister }) => {
  const getCategoryStyles = (category) => {
    switch (category?.toLowerCase()) {
      case 'technical': return { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: '💻' };
      case 'cultural': return { color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20', icon: '🎨' };
      case 'sports': return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', icon: '🏆' };
      case 'workshop': return { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', icon: '🛠️' };
      default: return { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: '📅' };
    }
  };

  const catStyle = getCategoryStyles(event.category);

  return (
    <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full relative">
      {event.is_featured === 1 && (
        <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
          <span>⭐</span> Featured
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${catStyle.bg} ${catStyle.color} ${catStyle.border} border mb-4`}>
          <span>{catStyle.icon}</span>
          {event.category}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.name}</h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
          {event.description}
        </p>
        
        <div className="space-y-2.5 text-sm text-gray-300 mb-6">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <button 
          onClick={() => onRegister(event)}
          className="w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
