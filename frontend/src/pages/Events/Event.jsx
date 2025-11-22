import React from 'react';
import { Link } from 'react-router-dom';
const Event = () => {
  return (
    <div className="bg-white min-h-screen p-6" data-cy="event-page">
      <h1 className="text-3xl font-bold text-[#184E77] mb-8 border-b border-gray-200 pb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/anniversary" 
          className="block p-6 border border-gray-200 hover:border-[#1E6091] transition-colors"
          data-cy="anniversary-link"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Anniversary</h2>
          <p className="text-gray-700">View anniversary celebrations</p>
        </Link>
        <Link 
          to="/conclave" 
          className="block p-6 border border-gray-200 hover:border-[#1E6091] transition-colors" data-cy="conclave-link"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Conclave</h2>
          <p className="text-gray-700">Explore conference events</p>
        </Link>       
        <Link 
          to="/ente-keralam" 
          className="block p-6 border border-gray-200 hover:border-[#1E6091] transition-colors"
          data-cy="ente-keralam-link"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Ente Keralam</h2>
          <p className="text-gray-700">Discover cultural programs</p>
        </Link>       
        <Link 
          to="/inauguration" 
          className="block p-6 border border-gray-200 hover:border-[#1E6091] transition-colors"
          data-cy="inauguration-link"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Inauguration</h2>
          <p className="text-gray-700">View inauguration ceremonies</p>
        </Link>
        <Link 
          to="/news" 
          className="block p-6 border border-gray-200 hover:border-[#1E6091] transition-colors"
          data-cy="news-link"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-3">News</h2>
          <p className="text-gray-700">Stay updated with latest news</p>
        </Link>
      </div>
    </div>
  );
};
export default Event;