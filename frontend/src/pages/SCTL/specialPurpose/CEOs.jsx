import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CEOs = () => {
  const [ceos, setCeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/ceos/')
      .then(response => {
        setCeos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching CEOs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#184E77] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Succession List of CEO</h1>
          <div className="w-20 h-1 bg-white"></div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600 py-10">Loading data...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1E6091] text-white">
                <th className="p-4 text-left font-semibold border-b border-[#184E77]">No</th>
                <th className="p-4 text-left font-semibold border-b border-[#184E77]">Name</th>
                <th className="p-4 text-left font-semibold border-b border-[#184E77]">Joining Date</th>
                <th className="p-4 text-left font-semibold border-b border-[#184E77]">Relieving Date</th>
              </tr>
            </thead>
            <tbody>
              {ceos.map((ceo, index) => (
                <tr key={ceo.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-gray-100`}>
                  <td className="p-4 font-medium text-gray-800">{index + 1}</td>
                  <td className="p-4 text-gray-700">{ceo.name}</td>
                  <td className="p-4 text-gray-600">{ceo.joining_date}</td>
                  <td className="p-4 text-gray-600">{ceo.relieving_date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CEOs;
