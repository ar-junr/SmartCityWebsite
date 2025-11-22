import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRightLong } from "react-icons/fa6";
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  useEffect(() => {
    axios.get('/api/news/')
      .then(response => {
        console.log('NEWS DATA:', response.data);
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
      <div className="bg-[#184E77] py-16" data-aos="fade-down">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">News & Updates</h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            Stay informed with the latest developments and announcements from Smart City Thiruvananthapuram
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12" data-aos="fade-up">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading news...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-500">No news available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-[1.02]"
                data-cy="news-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                    alt={item.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/fallback.jpg'; }}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white text-sm">{item.source}</span>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">
                      {isValidDate(item.date)
                        ? new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                        : 'Date N/A'}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 uppercase">
                      {item.type || 'NEWS'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-[#1E6091] transition-colors"
                  data-cy="news-title">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  </h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1E6091] font-medium hover:text-[#184E77]"
                  >
                    Read more <FaArrowRightLong className="ml-2 text-lg" />
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