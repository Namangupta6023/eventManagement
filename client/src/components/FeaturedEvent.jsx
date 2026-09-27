import React from 'react';

const FeaturedEvent = ({ event, onRegister }) => {
  if (!event) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-800 to-[#1e1b4b] border border-violet-500/20 group shadow-2xl">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5YzkyYTciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djIwaDJWMzRoLTJ6bS0yIDBoLTJ2MjBoMlYzNHptLTIwaDIwdi0yaC0yMHYyem0waDFwaDIwdjFIMTR2LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Animated glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-sm transition-opacity duration-500"></div>

      <div className="relative p-8 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold border border-yellow-500/30 flex items-center gap-1.5">
              <span>⭐</span> Premium Event
            </span>
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium border border-white/10">
              {event.category}
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
              {event.name}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {event.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-300 font-medium pt-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Date</div>
                <div>{new Date(event.date).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Time</div>
                <div>{event.time}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Venue</div>
                <div>{event.venue}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col justify-center">
          <button 
            onClick={() => onRegister(event)}
            className="w-full md:w-64 py-4 px-8 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-xl shadow-violet-500/30 transition-all hover:scale-105 active:scale-95"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
