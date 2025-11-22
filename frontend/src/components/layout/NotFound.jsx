import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col justify-center items-center h-full min-h-screen bg-gray-50 p-8" data-cy="not-found-page">
    <h1 className="text-6xl font-bold text-[#1E6091]">404</h1>
    <h2 className="text-2xl md:text-3xl text-gray-800 mt-4">Page Not Found</h2>
    <p className="text-gray-600 mt-2 mb-6">Looks like you fell into a black hole!</p>
    <Link to="/" className="inline-block bg-[#1E6091] hover:bg-[#184E77] text-white font-semibold px-6 py-3 rounded-lg shadow-md">
      Go Home
    </Link>
  </div>
);

export default NotFound;
