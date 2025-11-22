import React from 'react';
import { useTranslation } from 'react-i18next';
import AreaDemographyImage from '../../assets/images/visionArea.jpg';

const DemographySection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('demography.averageDensity'),
      value: '4,470 persons/sq.Km',
    },
    {
      label: t('demography.sexRatio'),
      value: '1,088 TO 1,000',
    },
    {
      label: t('demography.slumPopulation'),
      value: '75,623 persons',
    },
    {
      label: t('demography.householdSize'),
      value: '1,96,202 hhs, 4 persons/HH',
    },
    {
      label: t('demography.literacyRate'),
      value: '86%',
    },
  ];

  return (
    <div className="mb-16 max-w-6xl mx-auto px-4 md:px-8" >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#184E77]">
        {t('demography.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={AreaDemographyImage}
            alt={t('demography.imageAlt')}
            className="w-full h-auto"
          />
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200"
              >
                <p className="font-semibold text-[#1E6091]">{stat.label}</p>
                <p className="text-lg font-bold mt-1 text-[#184E77]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographySection;
