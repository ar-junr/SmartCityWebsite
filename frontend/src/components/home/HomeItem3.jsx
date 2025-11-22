import React, { useEffect, useState } from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const HomeItem3 = () => {
  const { t } = useTranslation();
  const [officials, setOfficials] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/officials/')
      .then(res => setOfficials(res.data))
      .catch(err => console.error("Failed to load officials", err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('homeItem3.title')}
          </h2>
          <div className="w-20 h-1 bg-[#184E77] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('homeItem3.description')}
          </p>
        </div>

        <div className="flex overflow-x-auto pb-8 space-x-6 sm:space-x-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-8 sm:overflow-visible hide-scrollbar">
          {officials.map((official, index) => (
            <div
              data-cy="official-card"
              key={index}
              className="bg-white shadow-lg min-w-[280px] sm:min-w-0 flex flex-col flex-shrink-0"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1 border-t-4 border-[#184E77] flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{official.name}</h3>
                <p className="text-[#184E77] font-medium mb-1">{official.title}</p>
                {official.description && (
                  <p className="text-gray-600 mb-6">{official.description}</p>
                )}

                <div className="mt-auto flex space-x-4 pt-4">
                  <a
                    href={official.linkedin || '#'}
                    className="flex items-center justify-center flex-1 bg-[#184E77] hover:bg-[#1E6091] text-white py-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className='mr-2' />
                    <span>{t('homeItem3.linkedin')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-aos="fade-up">
          <Link to="/spv">
            <button data-cy="view-all-officials" className="inline-flex items-center px-8 py-3 border border-[#184E77] text-lg font-medium text-[#184E77] bg-white hover:bg-blue-50 transition duration-300">
              {t('homeItem3.viewAll')} <FaArrowRightLong className='ml-2 h-4 w-4' />
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomeItem3;
