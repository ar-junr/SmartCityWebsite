import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Download } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import PDFIcon from '../../assets/images/pdfFile.png';
import Banner from '../../assets/banners/pageBanner.jpg';

const MPR = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch data from Django backend
  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.MPR))
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch MPR reports:", err);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

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
            Monthly Progress Reports
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Monthly Progress Reports</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Access detailed monthly progress reports documenting the development and achievements of our smart city initiatives
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by month or year..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {uniqueYears.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1E6091] text-white">
                  <th className="p-4 text-left font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Month</span>
                    </div>
                  </th>
                  <th className="p-4 text-left font-semibold text-sm">Year</th>
                  <th className="p-4 text-left font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedReports.length > 0 ? (
                  sortedReports.map((report, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-900">{report.month}</td>
                      <td className="p-4 text-gray-700">{report.year}</td>
                      <td className="p-4">
                        <a
                          href={report.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#1E6091] hover:text-[#184E77] transition-colors font-medium"
                        >
                          <img className="w-5 h-5" src={PDFIcon} alt="PDF" />
                          Download
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Reports Found</h3>
                      <p className="text-sm">Try adjusting your search or filter.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#1E6091]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[#1E6091]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About These Reports</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
