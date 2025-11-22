import React, { useEffect, useState } from 'react';
import { Newspaper, Calendar, ExternalLink } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/pageBanner.jpg';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.NEWS))
      .then(response => {
        const sorted = response.data
          .filter(item => isValidDate(item.date))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="news-page">
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
            News & Updates
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">News & Updates</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Stay informed with the latest developments and announcements from Smart City Thiruvananthapuram
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No news available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                data-cy="news-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image?.startsWith('http') ? item.image : API_CONFIG.getMediaUrl(item.image)}
                    alt={item.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/fallback.jpg'; }}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-white text-xs">{item.source}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {isValidDate(item.date)
                          ? new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                          : 'Date N/A'}
                      </span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {item.type || 'NEWS'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#1E6091] transition-colors line-clamp-2"
                    data-cy="news-title">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#1E6091] font-medium hover:text-[#184E77] text-sm transition-colors"
                  >
                    Read more <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default News;