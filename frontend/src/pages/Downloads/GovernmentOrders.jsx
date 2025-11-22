import React, { useEffect, useMemo, useState } from "react";
import { FileText, Calendar, Download, Search } from 'lucide-react';
import axios from "axios";
import API_CONFIG from '../../config/api';
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import Banner from '../../assets/banners/pageBanner.jpg';

// Vite-only: import every PDF under ./govtOrders as a URL
const localFiles = import.meta.glob("./govtOrders/*.pdf", { eager: true, as: "url" });

function prettify(name) {
  return name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ");
}

export default function GovernmentOrders() {
  const [apiOrders, setApiOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Shape local static orders
  const staticOrders = useMemo(() => {
    return Object.entries(localFiles).map(([path, url]) => {
      const file = path.split("/").pop() || "order.pdf";
      return {
        id: `static-${file}`,
        title: prettify(file),
        date: null,        // no date metadata from file system
        pdf: url,
        isApi: false,
      };
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.GOVERNMENT_ORDERS));
        const shaped = (Array.isArray(data) ? data : []).map(o => ({
          id: `api-${o.id}`,
          rawId: o.id,
          title: o.title,
          date: o.date,
          pdf: o.pdf,
          isApi: true,
        }));
        setApiOrders(shaped);
      } catch (e) {
        console.error("Error fetching government orders:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Merge; optional: sort by date (API items first by date desc, then static)
  const combined = [
    ...apiOrders.sort((a,b) => (b.date || "").localeCompare(a.date || "")),
    ...staticOrders,
  ];

  const filteredOrders = combined.filter(order =>
    order.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("en-GB") : "—");

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="government-orders-page">
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
            Government Orders
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Government Orders</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Official government orders and notifications related to Smart City Thiruvananthapuram
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E6091] text-white">
                    <th className="p-4 text-left font-semibold text-sm">No</th>
                    <th className="p-4 text-left font-semibold text-sm">Title</th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Date</span>
                      </div>
                    </th>
                    <th className="p-4 text-left font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Document</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="p-4 font-medium text-gray-700 whitespace-nowrap">{idx + 1}</td>
                        <td className="p-4">
                          {row.isApi ? (
                            <Link to={`/government-orders/${row.rawId}`} className="text-[#1E6091] hover:text-[#184E77] hover:underline font-medium">
                              {row.title}
                            </Link>
                          ) : (
                            <a href={row.pdf} target="_blank" rel="noreferrer" className="text-[#1E6091] hover:text-[#184E77] hover:underline font-medium">
                              {row.title}
                            </a>
                          )}
                        </td>
                        <td className="p-4 text-gray-700 whitespace-nowrap text-sm">{fmt(row.date)}</td>
                        <td className="p-4">
                          <a href={row.pdf} target="_blank" rel="noreferrer" className="text-[#1E6091] hover:text-[#184E77] transition-colors">
                            <FaFilePdf className="text-xl inline-block" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-500">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p>No orders found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* External Link */}
        <div className="mt-6 text-center">
          <a
            href="https://go.lsgkerala.gov.in/pages/query.php?txtgo=SCTL%2CSmart+city+thiruvananthapuram&sbmtsearch=Search&select=tag&Start=23&Index=2"
            target="_blank" rel="noopener noreferrer"
            className="text-[#1E6091] hover:text-[#184E77] hover:underline font-medium"
          >
            View more government orders →
          </a>
        </div>
      </div>
    </div>
  );
}
