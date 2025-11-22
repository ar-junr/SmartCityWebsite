// src/components/vision/LandUsePatternSection.jsx
import React from 'react';
import MapTVM from '../../assets/images/tvm_map.jpg';
import { useTranslation } from 'react-i18next';

const LandUsePatternSection = () => {
  const { t } = useTranslation();
  const landUseData = t('landuse.data', { returnObjects: true });

  return (
    <div className="mb-16 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: '#184E77' }}>
        {t('landuse.title')}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2">
          <img
            src={MapTVM}
            alt={t('landuse.mapAlt')}
            className="w-full h-auto border border-gray-200"
          />
        </div>

        <div className="w-full lg:w-1/2 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#1E6091' }}>
                <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-gray-300">{t('landuse.columns.landUse')}</th>
                <th className="px-4 py-3 text-center text-white font-semibold text-sm border border-gray-300">{t('landuse.columns.area')}</th>
                <th className="px-4 py-3 text-center text-white font-semibold text-sm border border-gray-300">{t('landuse.columns.percent')}</th>
                <th className="px-4 py-3 text-center text-white font-semibold text-sm border border-gray-300">{t('landuse.columns.guideline')}</th>
              </tr>
            </thead>
            <tbody>
              {landUseData.map((item, index) => (
                <tr
                  key={index}
                  className={index === landUseData.length - 1 ? 'font-semibold' : ''}
                >
                  <td
                    className="px-4 py-3 text-sm border border-gray-200"
                    style={{
                      backgroundColor: index === landUseData.length - 1 ? '#184E77' : '#1E6091',
                      color: 'white'
                    }}
                  >
                    {item.landUse}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-gray-200 bg-white">
                    {item.area}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-gray-200 bg-gray-50">
                    {item.percent}
                    {item.percent !== '100%' && '%'}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-gray-200 bg-white">
                    {item.guideline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-2 text-right">{t('landuse.source')}</p>
        </div>
      </div>
    </div>
  );
};

export default LandUsePatternSection;
