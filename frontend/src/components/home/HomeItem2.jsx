import React from 'react';
import Vision from '../../assets/images/smart-city-vision.png';
import { useTranslation } from 'react-i18next';

const HomeItem2 = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-primary-50 py-20 px-4 md:px-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 relative z-10">
        
        {/* Left: Content */}
        <div className="md:w-1/2 text-left space-y-8" data-aos="fade-right">
          {/* Vision Section */}
          <div className="bg-white rounded-2xl p-8 shadow-large hover:shadow-glow transition-all duration-300 border border-primary-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                {t('homeItem2.visionTitle')}
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed pl-16 border-l-4 border-primary-500 py-2">
              {t('homeItem2.visionText')}
            </p>
          </div>

          {/* Strategy Section */}
          <div className="bg-white rounded-2xl p-8 shadow-large hover:shadow-glow transition-all duration-300 border border-primary-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                {t('homeItem2.strategyTitle')}
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed pl-16 border-l-4 border-primary-500 py-2">
              {t('homeItem2.strategyText')}
            </p>
          </div>
          
          <div className="pl-16">
            <a href="/misson-vision">
              <button className="bg-gradient-primary text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-large hover:shadow-glow hover:scale-105 transition-all duration-300 transform">
                {t('homeItem2.readMore')}
                <span className="ml-2">→</span>
              </button>
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex justify-center" data-aos="zoom-in-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20"></div>
            <div className="absolute inset-0 bg-primary-200 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300 opacity-10"></div>
            <img 
              src={Vision} 
              alt={t('homeItem2.imageAlt')} 
              className="relative w-full max-w-md object-contain z-10 shadow-large rounded-2xl group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeItem2;
