import React from 'react';
import { Link } from 'react-router-dom';
const GalleryPage = () => {
  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[#184E77] mb-8 border-b border-gray-200 pb-4">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link 
          to="/photo-gallery" 
          className="block p-8 border border-gray-200 hover:border-[#1E6091] transition-colors group"
        >
          <div className="flex flex-col items-center">
            <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-[#1E6091] group-hover:text-[#184E77] transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#1E6091] group-hover:text-[#184E77] transition-colors">Photo Gallery</h2>
          </div>
        </Link>
        
        <Link 
          to="/video-gallery" 
          className="block p-8 border border-gray-200 hover:border-[#1E6091] transition-colors group"
        >
          <div className="flex flex-col items-center">
            <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-[#1E6091] group-hover:text-[#184E77] transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#1E6091] group-hover:text-[#184E77] transition-colors">Video Gallery</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;