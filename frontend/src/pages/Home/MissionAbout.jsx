import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

import AboutBanner from '../../assets/banners/pageBanner.jpg';
import AboutImage1 from '../../assets/images/aboutImage1.jpg';
import AboutImage2 from '../../assets/images/aboutImage2.jpg';

const MissionAbout = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${AboutBanner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full" data-aos="fade-down">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
            {t('mission_about.title')}
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* First Section */}
        <div className="mb-12 bg-white border border-gray-200 p-6 md:p-8" data-aos="fade-up">
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#184E77] mb-6 text-center">
              {t('mission_about.section1_heading')}
            </h3>
            <div className="w-full md:w-3/4 mb-8" data-aos="zoom-in">
              <img 
                src={AboutImage1} 
                alt="About Smart City Mission" 
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-700 leading-relaxed md:text-lg w-full md:w-3/4" data-aos="fade-left">
              {t('mission_about.section1_text')}
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="mb-12 bg-white border border-gray-200 p-6 md:p-8" data-aos="fade-up">
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#184E77] mb-6 text-center">
              {t('mission_about.section2_heading')}
            </h3>
            <div className="w-full md:w-3/4 mb-8" data-aos="zoom-in">
              <img 
                src={AboutImage2} 
                alt="Smart Cities in India" 
                className="w-full h-auto"
              />
            </div>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 md:text-lg w-full md:w-3/4">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="pb-4 border-b border-gray-200" data-aos={i % 2 === 0 ? 'fade-left' : 'fade-right'}>
                  {t(`mission_about.points.${i + 1}`)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAbout;
