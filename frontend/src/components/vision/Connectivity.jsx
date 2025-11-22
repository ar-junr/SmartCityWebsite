// src/components/vision/Connectivity.jsx
import React from 'react';
import Image from '../../assets/images/visionStrategy.jpg';
import { useTranslation } from 'react-i18next'; // ✅ Import useTranslation

const Connectivity = () => {
  const { t } = useTranslation(); // ✅ Initialize translation

  return (
    <div className="mb-16 max-w-6xl mx-auto px-4 md:px-8" >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#184E77]">
        {t('connectivity.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={Image}
            alt={t('connectivity.imageAlt')}
            className="w-full h-auto"
          />
        </div>

        <div className="space-y-6">
          {['airport', 'railway', 'ksrtc'].map((key) => (
            <div
              key={key}
              className="bg-white p-6 border border-gray-200 border-l-4 border-l-[#1E6091]"
            >
              <h2 className="text-xl font-bold mb-2 text-[#184E77]">
                {t(`connectivity.${key}.title`)}
              </h2>
              <p className="text-gray-700">
                {t(`connectivity.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gray-100 p-6 border border-gray-200">
        <ul className="list-disc list-inside space-y-3 pl-2">
          {t('connectivity.bulletPoints', { returnObjects: true }).map((point, index) => (
            <li key={index} className="text-gray-700">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Connectivity;
