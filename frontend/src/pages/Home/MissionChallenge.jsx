import React from 'react';
import MissionChallengeBanner from '../../assets/banners/challengeBanner.jpg';
import { useTranslation } from 'react-i18next';

const MissionChallenge = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${MissionChallengeBanner})`,
          }}
          data-aos="zoom-in"
        ></div>
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full"
          data-aos="fade-down"
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
            {t('missionChallenge.heading')}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            {t('missionChallenge.para1')}
          </p>
          <p
            className="text-lg leading-relaxed text-gray-700"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('missionChallenge.para2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionChallenge;
