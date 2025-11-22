import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Download, Search, Filter } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import PdfFile from '../../assets/images/pdfFile.png';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../data/dateFormatter';
import Banner from '../../assets/banners/tenderBanner.jpg';

const TenderTable = () => {
  const [tenders, setTenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.TENDERS))
      .then(res => {
        setTenders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tenders:', err);
        setLoading(false);
      });
  }, []);

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch =
      tender.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tender.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            Tenders
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tenders</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Current and archived tenders for Smart City Thiruvananthapuram projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tenders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="md:w-48 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent appearance-none bg-white"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
                <p className="mt-4 text-gray-600">Loading tenders...</p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E6091] text-white">
                    <th className="p-4 text-left font-semibold text-sm">Tender No.</th>
                    <th className="p-4 text-left font-semibold text-sm">Title</th>
                    <th className="p-4 text-left font-semibold text-sm">Status</th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline</span>
                      </div>
                    </th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Documents</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTenders.length > 0 ? (
                    currentTenders.map((tender, index) => {
                      const isExpired = new Date(tender.last_date_to_submit) < new Date();

                      return (
                        <tr
                          key={index}
                          className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{tender.no}</td>
                          <td className="p-4">
                            <Link
                              to={`/tenders/${tender.id}`}
                              className="text-[#1E6091] hover:text-[#184E77] hover:underline transition-colors font-medium"
                            >
                              {tender.title}
                            </Link>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                              isExpired || tender.status === 'Closed'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {isExpired ? 'Closed' : tender.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-700 whitespace-nowrap text-sm">
                            {formatDateTime(tender.last_date_to_submit)}
                            {isExpired && (
                              <span className="ml-2 text-red-600 text-xs font-semibold">(Expired)</span>
                            )}
                          </td>
                          <td className="p-4">
                            <a
                              href={tender.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[#1E6091] hover:text-[#184E77] transition-colors font-medium"
                            >
                              <img className="w-4 h-4" src={PdfFile} alt="PDF" />
                              <span>Download</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No tenders found</h3>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>


        {/* Pagination */}
        {filteredTenders.length > itemsPerPage && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTenders.length)} of {filteredTenders.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === number
                        ? 'bg-[#1E6091] text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderTable;
