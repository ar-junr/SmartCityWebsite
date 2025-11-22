import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoNewspaper } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

const HomeItem4 = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const isValidDate = (dateString) => !isNaN(new Date(dateString).getTime());

  useEffect(() => {
    axios.get('http://localhost:8000/api/news/')
      .then(response => {
        const sorted = response.data
          .filter(item => isValidDate(item.date))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        setAnnouncements(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || announcements.length === 0) return;
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length, itemsPerView]);

  const goToNext = () => {
    if (announcements.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev =>
        prev >= announcements.length - itemsPerView ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    if (announcements.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev =>
        prev === 0 ? Math.max(0, announcements.length - itemsPerView) : prev - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToIndex = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const visibleItems = announcements.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-fade-in-up">{t('homeItem4.title')}</h2>
        <div className="w-20 h-1 bg-[#184E77] mx-auto"></div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">{t('homeItem4.loading')}</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t('homeItem4.noAnnouncements')}</div>
      ) : (
        <>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {announcements.length > itemsPerView && (
              <>
                <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 shadow-md hover:bg-gray-50 transition -ml-4">
                  <GrPrevious style={{ color: '#1E6091', width: 50 }} />
                </button>
                <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 w-10 h-10 shadow-md hover:bg-gray-50 transition -mr-4">
                  <GrNext style={{ color: '#1E6091', width: 50 }} />
                </button>
              </>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-70' : 'opacity-100'}`}>
              {visibleItems.map(item => (
                <div data-cy="news-card" key={item.id} className="bg-white border border-gray-200 h-full flex flex-col transition-opacity duration-700 ease-in-out transform animate-slide-up">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/fallback.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#184E77] text-white p-2 rounded mr-2">
                        <IoNewspaper className='w-5 h-5' />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 capitalize">{item.type || t('homeItem4.defaultType')}</h3>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-[#184E77] bg-blue-50 px-2 py-1 rounded">
                        {isValidDate(item.date)
                          ? new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : t('homeItem4.dateNA')}
                      </span>
                      <span className="text-xs text-gray-500">{item.source}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{item.excerpt}</p>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#184E77] text-sm font-medium hover:underline">
                      {t('homeItem4.readMore')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {announcements.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(announcements.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full ${index === Math.floor(currentIndex / itemsPerView)
                    ? 'bg-[#184E77] animate-pulse'
                    : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-center">
        <a href="/news">
          <button className="inline-flex items-center px-6 py-3 bg-[#184E77] text-white font-medium hover:bg-[#0e3a5d] transition-colors">
            {t('homeItem4.viewAll')} <FaArrowRightLong className='ml-2 h-4 w-4' />
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomeItem4;
