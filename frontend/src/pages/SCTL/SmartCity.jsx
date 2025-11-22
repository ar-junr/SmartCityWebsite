import React from 'react';
import { Link } from 'react-router-dom';

const SmartCity = () => {
  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[#184E77] mb-8 border-b border-gray-200 pb-4">Smart City</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/spv" 
          className="block p-4 border border-gray-200 hover:border-[#1E6091] transition-colors"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-2">Special Purpose Vehicle</h2>
          <p className="text-gray-700">Learn about our organizational structure</p>
        </Link>
        
        <Link 
          to="/pmc_consultant" 
          className="block p-4 border border-gray-200 hover:border-[#1E6091] transition-colors"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-2">Consultant</h2>
          <p className="text-gray-700">View our consulting partners</p>
        </Link>
        
        <Link 
          to="/funds" 
          className="block p-4 border border-gray-200 hover:border-[#1E6091] transition-colors"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-2">Project Funds</h2>
          <p className="text-gray-700">Explore funding details</p>
        </Link>
        
        <Link 
          to="/financials" 
          className="block p-4 border border-gray-200 hover:border-[#1E6091] transition-colors"
        >
          <h2 className="text-xl font-semibold text-[#1E6091] mb-2">Financials</h2>
          <p className="text-gray-700">Review financial reports</p>
        </Link>
      </div>
    </div>
  );
};

export default SmartCity;