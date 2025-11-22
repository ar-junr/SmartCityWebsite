import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [statusFilter, setStatusFilter] = useState('All'); // New
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/internships/');
        // Sort by date descending
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
    <div className="bg-gray-50" data-cy="internship-page">
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        {/* Table */}
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading internships...</div>
        ) : filteredInternships.length > 0 ? (
          <div className="overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E6091] text-white">
                  <th className="p-4 font-semibold border-b border-[#184E77]">Post</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Title</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Status</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Date</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Documents</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredInternships.map((intern, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-700 font-medium">{intern.post}</td>
                    <td className="p-4 text-gray-700">{intern.title}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 ${intern.status === 'Open'
                            ? 'bg-[#D9ED92] text-[#1E6091]'
                            : 'bg-gray-200 text-gray-700'
                          }`}
                      >
                        {intern.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{intern.date}</td>
                    <td className="p-4">
                      {intern.external_url ? (
                        <a
                          href={intern.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#1A759F] hover:text-[#184E77]"
                        >
                          <span className="mr-1">View Link</span>
                          <FaExternalLinkAlt />
                        </a>
                      ) : intern.pdf_link ? (
                        <a
                          href={intern.pdf_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#1A759F] hover:text-[#184E77]"
                        >
                          <FaFilePdf className="text-xl mx-2" />
                          <span>View</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">No file</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-8 text-center border-t-4 border-[#1E6091]">
            <p className="text-gray-600">No internships found for selected status.</p>
            <p className="text-gray-600 mt-2">Please try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Internship;