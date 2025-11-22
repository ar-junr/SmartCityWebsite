import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/pmcBanner.png';
import Krail from '../../assets/images/krail_logo.png';
import PMCTeam from '../../assets/images/pmc.jpg';

const Consultant = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center object-cover"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 60, 80, 0.85), rgba(0, 128, 128, 0.6)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg">
            {t('consultant.title')}
          </h1>
        </div>
      </div>

      {/* Consultant Details */}
      <div className="w-full flex flex-col lg:flex-row gap-4 min-h-[600px] lg:min-h-[500px]">
        <div className="w-full lg:w-1/2">
          <img
            src={Krail}
            alt="Smart City Trivandrum"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 px-6 py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b-2 border-[#184E77] pb-2">
            {t('consultant.krailTitle')}
          </h2>

          <p className="text-gray-700 leading-relaxed text-base">
            {t('consultant.krailDescription')}
          </p>
        </div>
      </div>

      {/* PMC Team Section */}
      <div className="bg-gray-100 shadow-md p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 border-b-2 border-[#184E77] pb-4 inline-block">
            {t('consultant.pmcTitle')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg mt-6">
            {t('consultant.pmcIntro')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <img
              src={PMCTeam}
              alt="Project Management Consultancy Team"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              <div className="border-l-4 border-[#184E77] pl-4 py-2">
                <h3 className="text-xl font-bold text-gray-800">{t('consultant.expertiseTitle')}</h3>
                <p className="text-gray-600 mt-2">{t('consultant.expertiseText')}</p>
              </div>

              <div className="border-l-4 border-[#184E77] pl-4 py-2">
                <h3 className="text-xl font-bold text-gray-800">{t('consultant.responsibilitiesTitle')}</h3>
                <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-2">
                  <li>{t('consultant.responsibility1')}</li>
                  <li>{t('consultant.responsibility2')}</li>
                  <li>{t('consultant.responsibility3')}</li>
                  <li>{t('consultant.responsibility4')}</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#184E77] pl-4 py-2">
                <h3 className="text-xl font-bold text-gray-800">{t('consultant.commitmentTitle')}</h3>
                <p className="text-gray-600 mt-2">{t('consultant.commitmentText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultant;
