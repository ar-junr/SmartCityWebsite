import React from 'react';
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Logo from '../../assets/images/SCTLLogo.png';
import GovKerala from '../../assets/images/govKerala.png';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const Header = () => {
  const { t, i18n } = useTranslation(); 
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ml' : 'en'; 
    i18n.changeLanguage(newLang); 
  };
  
  return (
    <header className="hidden md:block bg-gradient-primary text-white shadow-md w-full relative z-50" data-cy="header">
      {/* Main Header - Desktop Only */}
      <div className="px-2 sm:px-4">
        <div className="max-w-8xl mx-auto flex justify-between items-center py-2 sm:py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a href="/" className="h-10 sm:h-12 w-12 sm:w-16 flex items-center justify-center hover:opacity-90 transition-opacity">
              <img src={Logo} alt="Smart city logo" className="h-full w-full object-contain" />
            </a>
            <div className="ml-1 sm:ml-2">
              <a href="https://tmc.lsgkerala.gov.in/en/home" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity block">
                <img className='h-10 sm:h-12 object-contain' src={GovKerala} alt="Govt of kerala" />
              </a>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
            {/* Phone & Email */}
            <div className="flex items-center gap-3 lg:gap-6">
              <a
                href="tel:+91-0471-4010374"
                className="flex items-center text-xs lg:text-sm hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                <FaPhone className='w-3 h-3 lg:w-4 lg:h-4 mr-1' />
                <span className="hidden lg:inline">+91-0471-4010374</span>
                <span className="lg:hidden">0471-4010374</span>
              </a>
              <a
                href="mailto:info@smartcitytvm.in"
                className="flex items-center gap-1 text-xs lg:text-sm hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                <MdEmail className='w-3 h-3 lg:w-4 lg:h-4' />
                <span className="hidden xl:inline">info@smartcitytvm.in</span>
                <span className="xl:hidden">Email</span>
              </a>
            </div>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-[#1E6091]"></div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1.5 hover:bg-[#1E6091] rounded-md transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              <span className="mr-2 font-medium">
                {i18n.language === 'en' ? 'EN' : 'ML'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-[#1E6091]"></div>

            {/* Smart App Link */}
            <a
              href="#"
              className="flex items-center hover:text-accent-yellow transition-colors text-sm font-medium px-2 py-1 rounded-md hover:bg-white/10"
            >
              <IoPhonePortraitOutline className='w-5 h-5 mr-1' />
              <span>{t('smart_app')}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
