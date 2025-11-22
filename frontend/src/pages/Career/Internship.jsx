import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, FileText, ExternalLink, Filter } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/internshipBanner.jpg';
import { FaFilePdf } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';

const internshipPdfMap = import.meta.glob(
  "/src/pages/Career/InternshipFolder/*.pdf",
  { eager: true, as: "url" }
);

const Internship = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.INTERNSHIPS));
        const sortedData = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInternships(sortedData);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);
  // Filter internships based on status
  const filteredInternships = internships.filter((intern) => {
    return statusFilter === 'All' || intern.status === statusFilter;
  });
  return (
    <div className="bg-gray-50 min-h-screen" data-cy="internship-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Internships
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Internships</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Explore internship opportunities with Smart City Thiruvananthapuram
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-end">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent appearance-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading internships...</p>
          </div>
        ) : filteredInternships.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E6091] text-white">
                    <th className="p-4 text-left font-semibold text-sm">Post</th>
                    <th className="p-4 text-left font-semibold text-sm">Title</th>
                    <th className="p-4 text-left font-semibold text-sm">Status</th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Date</span>
                      </div>
                    </th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInternships.map((intern, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-900">{intern.post}</td>
                      <td className="p-4 text-gray-700">{intern.title}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            intern.status === 'Open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {intern.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700 text-sm">{intern.date}</td>
                      <td className="p-4">
                        {intern.external_url ? (
                          <a
                            href={intern.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#1E6091] hover:text-[#184E77] transition-colors font-medium"
                          >
                            <span>View Link</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : intern.pdf_link ? (
                          <a
                            href={intern.pdf_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#1E6091] hover:text-[#184E77] transition-colors font-medium"
                          >
                            <FaFilePdf className="text-lg" />
                            <span>View</span>
                          </a>
                        ) : (
                          <span className="text-gray-400 italic text-sm">No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No internships found for selected status.</p>
            <p className="text-gray-600 mt-2 text-sm">Please try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Internship;