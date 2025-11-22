import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../../config/api';

const CEOs = () => {
  const [ceos, setCeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CEOS))
      .then(response => {
        setCeos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching CEOs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
        <p className="mt-4 text-gray-600">Loading CEO data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-6 h-6 text-[#1E6091]" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Succession List of CEO</h2>
        </div>
        <p className="text-gray-600 mt-2">
          Historical record of Chief Executive Officers who have served the organization
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1E6091] text-white">
              <th className="p-4 text-left font-semibold text-sm">No</th>
              <th className="p-4 text-left font-semibold text-sm">Name</th>
              <th className="p-4 text-left font-semibold text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joining Date</span>
                </div>
              </th>
              <th className="p-4 text-left font-semibold text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Relieving Date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ceos.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No CEO records found
                </td>
              </tr>
            ) : (
              ceos.map((ceo, index) => (
                <tr 
                  key={ceo.id || index} 
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{ceo.name || 'N/A'}</td>
                  <td className="p-4 text-gray-700">{ceo.joining_date || '-'}</td>
                  <td className="p-4 text-gray-700">{ceo.relieving_date || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CEOs;
