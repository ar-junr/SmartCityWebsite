import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../../assets/banners/careerBanner.jpg';
import { FaFilePdf } from "react-icons/fa6";
import { Link } from 'react-router-dom';





const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/careers/')
      .then(res => {
        setCareers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching careers:", err);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCareers = careers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(careers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50" data-cy="careers-page">
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
            Careers
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : careers.length === 0 ? (
          <div className="bg-white p-8 text-center border-t-4 border-[#1E6091]">
            <p className="text-gray-600">No career opportunities available at this time.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#1E6091]">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-12">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[180px]">Title</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-24">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-28">Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-32">Last Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[120px]">Link</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider min-w-[160px]">Documents</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCareers.map((career) => (
                    <tr key={career.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{career.no}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        <Link to={`/careers/${career.id}`} className="text-[#1A759F] hover:text-[#184E77] hover:underline">
                          {career.title}
                        </Link>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{career.status}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {career.posted_on ? new Date(career.posted_on).toLocaleDateString('en-GB').replace(/\//g, '-') : '-'}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {career.last_date_to_apply ? new Date(career.last_date_to_apply).toLocaleDateString('en-GB').replace(/\//g, '-') : '-'}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-blue-600">
                        {career.link ? (
                          <a href={career.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Apply
                          </a>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 space-y-1">
                        {career.resources && career.resources.length > 0 ? (
                          career.resources.map((res) => (
                            <div key={res.id} className="flex items-start">
                              {res.pdf && (
                                <a href={res.pdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#1A759F] hover:text-[#184E77]">
                                  <FaFilePdf className="flex-shrink-0" /> <span className="truncate max-w-[140px]">{res.label}</span>
                                </a>
                              )}
                              {res.link && (
                                <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[140px]">
                                  {res.label}
                                </a>
                              )}
                            </div>
                          ))
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {careers.length > itemsPerPage && (
              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, careers.length)} of {careers.length} entries
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
          </>
        )}
      </div>
    </div>
  );
};

export default Careers;
