// src/components/vision/VisionSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';  // ✅ added

const VisionSection = () => {
  const { t } = useTranslation();  // ✅ added

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50" data-cy="vision-section">
      {/* Vision card */}
      <div className="bg-white p-6 md:p-8 border-l-4 border-[#1E6091] shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#184E77]">
          {t('visionSection.visionTitle')}  {/* ✅ replaced hard text */}
        </h1>
        <p className="text-gray-700 leading-relaxed">
          {t('visionSection.visionText')}
        </p>
      </div>

      {/* Strategy card */}
      <div className="bg-white p-6 md:p-8 border-l-4 border-[#1E6091] shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#184E77]">
          {t('visionSection.strategyTitle')}
        </h1>
        <p className="text-gray-700 leading-relaxed">
          {t('visionSection.strategyText')}
        </p>
      </div>
    </div>
  );
};

export default VisionSection;
