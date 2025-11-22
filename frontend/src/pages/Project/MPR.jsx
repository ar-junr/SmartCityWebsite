import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PDFIcon from '../../assets/images/pdfFile.png';

const MPR = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  // Fetch data from Django backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mpr/')
      .then(res => setReports(res.data))
      .catch(err => console.error("Failed to fetch MPR reports:", err));
  }, []);

  // Helper to convert month names to numbers
  const monthToNumber = (monthName) => {
    const months = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    };
    return months[monthName.toLowerCase()] || 0;
  };

  // Filter reports based on search and selected year
  const filteredReports = reports.filter((report) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const reportLower = report.month.toLowerCase();
    const matchesSearch =
      reportLower.includes(lowerCaseSearch) || String(report.year).includes(lowerCaseSearch);
    const matchesYear = selectedYear === 'All' || String(report.year) === selectedYear;
    return matchesSearch && matchesYear;
  });

  // Sort by year DESC, then month DESC
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return monthToNumber(b.month) - monthToNumber(a.month);
  });

  // Get unique years for the filter dropdown
  const uniqueYears = [...new Set(reports.map(report => report.year))]
    .filter(Boolean)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-4">
            Monthly Progress Reports
          </h1>
          <div className="w-24 h-1 bg-[#1E6091] mx-auto"></div>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
            Access detailed monthly progress reports documenting the development and achievements of our smart city initiatives.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search by month or year..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E6091]"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {uniqueYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm mb-12 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#1E6091] text-white">
                  <th className="p-4 font-semibold border-b border-[#184E77]">Month</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Year</th>
                  <th className="p-4 font-semibold border-b border-[#184E77]">Download Report</th>
                </tr>
              </thead>
              <tbody>
                {sortedReports.length > 0 ? (
                  sortedReports.map((report, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-4 text-gray-800 font-medium">{report.month}</td>
                      <td className="p-4 text-gray-800">{report.year}</td>
                      <td className="p-4">
                        <a
                          href={report.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center text-[#1E6091] hover:text-[#184E77] transition"
                        >
                          <img className="w-6 h-6 mr-2" src={PDFIcon} alt="PDF" />
                          Download
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Reports Found</h3>
                        <p>Try adjusting your search or filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white p-6 border border-gray-200 rounded-lg max-w-4xl mx-auto text-left">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1E6091]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-[#184E77] mb-2">About These Reports</h3>
              <p className="text-gray-700">
                Monthly Progress Reports (MPRs) provide detailed updates on project status, milestones achieved, challenges faced, and future plans. These documents are published regularly to ensure transparency in our smart city initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MPR;
