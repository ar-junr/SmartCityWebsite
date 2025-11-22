import React from 'react';
import Mlcp from '../../assets/images/mlcpSmart.jpg';
import { useTranslation } from 'react-i18next';

const HomeItem1 = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white overflow-hidden py-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[600px] lg:min-h-[500px] px-4">
        
        {/* LEFT IMAGE */}
        <div
          className="w-full lg:w-1/2 relative group"
          data-aos="zoom-in-right"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
          <img
            src={Mlcp}
            alt={t("homeItem1.imageAlt")}
            className="w-full h-full object-cover rounded-lg shadow-large group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* RIGHT TEXT */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 px-6 py-8"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text border-b-2 border-primary-500 pb-3">
            {t("homeItem1.heading")}
          </h2>

          <p className="text-gray-700 leading-relaxed text-base">
            {t("homeItem1.para1")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base">
            {t("homeItem1.para2")}
          </p>

          <p className="text-gray-700 leading-relaxed text-base">
            {t("homeItem1.para3")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeItem1;
