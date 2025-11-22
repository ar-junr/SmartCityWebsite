// src/components/vision/Evolution.jsx
import React from 'react';
import CityEvolutionImage from '../../assets/images/visionEvolution.jpg';
import { useTranslation } from 'react-i18next';

const Evolution = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-16 max-w-6xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#184E77]">
        {t('evolution.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-200">
          <img
            src={CityEvolutionImage}
            alt={t('evolution.imageAlt')}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <ul className="space-y-4">
            {t('evolution.points', { returnObjects: true }).map((item, index) => (
              <li key={index} className="flex items-start group">
                <div className="flex-shrink-0 w-6 h-6 bg-[#1E6091] flex items-center justify-center mr-3 mt-1 group-hover:bg-[#184E77] transition-colors">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                <span className="text-gray-700 group-hover:text-[#184E77] transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Evolution;
