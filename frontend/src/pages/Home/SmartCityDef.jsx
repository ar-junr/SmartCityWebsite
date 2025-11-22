import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

import CityDefBanner from '../../assets/banners/cityDefBanner.jpg';
import SmartCityDefImage from '../../assets/images/smartCityDef.jpg';

const SmartCityDef = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden" data-aos="fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${CityDefBanner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center tracking-tight drop-shadow-md">
            {t('smartCityDef.title')}
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* YouTube Video Section */}
        <div className="mb-12" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('smartCityDef.understanding')}
              </h2>
              <h3 className="text-xl text-[#1E6091] font-semibold">
                {t('smartCityDef.subtitle')}
              </h3>
            </div>
          </div>
          <div className="shadow-sm h-[350px] md:h-[500px]" data-aos="zoom-in">
            <iframe
              src="https://www.youtube.com/embed/nnyRZotnPSU"
              title="Smart City Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Image Section */}
        <div className="bg-white p-6 shadow-sm" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            {t('smartCityDef.components')}
          </h2>
          <div className="border border-[#1E6091] overflow-hidden">
            <img
              src={SmartCityDefImage}
              alt="Smart City Components Diagram"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="mt-4 text-gray-600 italic text-center">
            {t('smartCityDef.caption')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartCityDef;
