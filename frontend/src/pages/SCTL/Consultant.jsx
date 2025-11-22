import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Users, Briefcase } from 'lucide-react';
import Banner from '../../assets/banners/pmcBanner.png';
import Krail from '../../assets/images/krail_logo.png';
import PMCTeam from '../../assets/images/pmc.jpg';

const Consultant = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('krail');

  const tabs = [
    { id: 'krail', label: 'KRAIL', icon: Building2 },
    { id: 'pmc', label: 'PMC Team', icon: Users },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            {t('consultant.title')}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm transition-all duration-200 relative flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-[#1E6091] border-b-2 border-[#1E6091] bg-[#1E6091]/5'
                      : 'text-gray-600 hover:text-[#1E6091] hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'krail' && (
            <div className="p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-6 h-6 text-[#1E6091]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('consultant.krailTitle')}
                  </h2>
                </div>
                <p className="text-gray-600 mt-2">
                  {t('consultant.krailDescription')}
                </p>
              </div>
              
              <div className="flex justify-center">
                <img
                  src={Krail}
                  alt="KRAIL"
                  className="w-full max-w-2xl rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'pmc' && (
            <div className="p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-[#1E6091]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('consultant.pmcTitle')}
                  </h2>
                </div>
                <p className="text-gray-600 mt-2">
                  {t('consultant.pmcIntro')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <img
                    src={PMCTeam}
                    alt="Project Management Consultancy Team"
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-[#1E6091] pl-4 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('consultant.expertiseTitle')}</h3>
                    <p className="text-gray-600 text-sm">{t('consultant.expertiseText')}</p>
                  </div>

                  <div className="border-l-4 border-[#1E6091] pl-4 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('consultant.responsibilitiesTitle')}</h3>
                    <ul className="mt-2 text-gray-600 text-sm list-disc pl-5 space-y-1">
                      <li>{t('consultant.responsibility1')}</li>
                      <li>{t('consultant.responsibility2')}</li>
                      <li>{t('consultant.responsibility3')}</li>
                      <li>{t('consultant.responsibility4')}</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-[#1E6091] pl-4 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('consultant.commitmentTitle')}</h3>
                    <p className="text-gray-600 text-sm">{t('consultant.commitmentText')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultant;
