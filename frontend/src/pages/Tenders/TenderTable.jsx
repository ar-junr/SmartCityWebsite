import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfFile from '../../assets/images/pdfFile.png';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../data/dateFormatter';

const TenderTable = () => {
  const [tenders, setTenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tenders/')
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#184E77] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tenders</h1>
          <div className="w-20 h-1 bg-white"></div>
          <p className="mt-4 text-gray-200 max-w-3xl">
            Current and archived tenders for Smart City Thiruvananthapuram projects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search tenders..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#1E6091]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#1E6091]"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-10 text-gray-600">Loading tenders...</p>
          ) : (
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-[#1E6091] text-white">
                  <th className="px-6 py-4 text-left font-semibold border-b border-[#184E77]">Tender No.</th>
                  <th className="px-6 py-4 text-left font-semibold border-b border-[#184E77]">Title</th>
                  <th className="px-6 py-4 text-left font-semibold border-b border-[#184E77]">Status</th>
                  <th className="px-6 py-4 text-left font-semibold border-b border-[#184E77]">Deadline</th>
                  <th className="px-6 py-4 text-left font-semibold border-b border-[#184E77]">Documents</th>
                </tr>
              </thead>
              <tbody>
                {currentTenders.length > 0 ? (
                  currentTenders.map((tender, index) => {
                    const isExpired = new Date(tender.last_date_to_submit) < new Date();

                    return (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{tender.no}</td>
                        <td className="px-6 py-4 text-gray-700 leading-relaxed">
                          <Link
                            to={`/tenders/${tender.id}`}
                            className="text-[#1E6091] hover:underline"
                          >
                            {tender.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${isExpired || tender.status === 'Closed'
                              ? 'bg-gray-200 text-gray-800'
                              : 'bg-green-100 text-green-800'
                            }`}>
                            {isExpired ? 'Closed' : tender.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {formatDateTime(tender.last_date_to_submit)}
                          {isExpired && (
                            <span className="ml-2 text-red-600 text-sm font-semibold">(Expired)</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={tender.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#1E6091] hover:text-[#184E77] transition-colors"
                          >
                            <img className="w-5 h-5 mr-2" src={PdfFile} alt="PDF" />
                            <span className="underline">Download</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      No tenders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>


        {/* Pagination */}
        {filteredTenders.length > itemsPerPage && (
          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTenders.length)} of {filteredTenders.length} entries
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-300 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 ${currentPage === number ? 'bg-[#1E6091] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-300 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderTable;
