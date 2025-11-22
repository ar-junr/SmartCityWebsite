import React, { useState, useEffect } from 'react';
import { Users, Search, FileText } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/cityProjectBanner.jpg';

const BeneficiaryDetails = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace with actual API endpoint when available
    axios.get(API_CONFIG.getUrl('/api/beneficiaries/'))
      .then(res => {
        setBeneficiaries(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching beneficiaries:', err);
        setLoading(false);
      });
  }, []);

  const filteredBeneficiaries = beneficiaries.filter(ben =>
    ben.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ben.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || ''})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Beneficiary Details
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Beneficiary Details</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Information about beneficiaries of Smart City Thiruvananthapuram projects
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search beneficiaries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading beneficiaries...</p>
          </div>
        ) : filteredBeneficiaries.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E6091] text-white">
                    <th className="p-4 text-left font-semibold text-sm">No</th>
                    <th className="p-4 text-left font-semibold text-sm">Name</th>
                    <th className="p-4 text-left font-semibold text-sm">Project</th>
                    <th className="p-4 text-left font-semibold text-sm">Status</th>
                    <th className="p-4 text-left font-semibold text-sm">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBeneficiaries.map((ben, index) => (
                    <tr
                      key={ben.id || index}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                      <td className="p-4 text-gray-900">{ben.name || 'N/A'}</td>
                      <td className="p-4 text-gray-700">{ben.project || 'N/A'}</td>
                      <td className="p-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          ben.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ben.status || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-[#1E6091] hover:text-[#184E77] font-medium text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No beneficiaries found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryDetails;