import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import navigationData from '../../data/navData';
import Logo from '../../assets/images/SCTLLogo.png';
import GovKerala from '../../assets/images/govKerala.png';

const Navbar = () => {
  const [navigation, setNavigation] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const bannerRef = useRef(null);
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navItemRefs = useRef({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Reset scroll position and ensure navbar visibility on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsScrolled(false);
    setMenuOpen(false);
    setActiveDropdown(null);
    setShowSearch(false);
    // Clear any pending dropdown timeouts
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  }, [location.pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Scroll logic for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Make navbar sticky after scrolling past 100px
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ml' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Fetch nav and page data with fallback
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const [navRes, pageRes] = await Promise.all([
          axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.NAVIGATION)),
          axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.PAGES))
        ]);

        const navItems = navRes.data;
        const pages = pageRes.data;

        const structuredNav = navItems.map(nav => {
          const pageLinks = pages
            .filter(p => p.navigation_item === nav.id)
            .map(p => ({
              name: p.title,
              href: `/pages/${p.id}`
            }));

          const dropdownsFromNav = Array.isArray(nav.dropdown) ? nav.dropdown.map(d => ({
            name: d.name,
            href: d.href
          })) : [];

          return {
            ...nav,
            dropdown: dropdownsFromNav.length > 0 ? dropdownsFromNav : null,
            pages: pageLinks || []
          };
        });

        // Use API data if available, otherwise use fallback
        setNavigation(structuredNav.length > 0 ? structuredNav : navigationData);
      } catch (err) {
        console.error('Failed to fetch navigation, using fallback:', err);
        // Use fallback navigation data if API fails
        setNavigation(navigationData);
      }
    };

    fetchNavigation();
  }, []);

  const toggleMobileDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearchToggle = () => {
    setShowSearch(prev => !prev);
    setTimeout(() => {
      if (!showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
    setSearchQuery('');
    setMenuOpen(false);
  };

  // Ensure navigation is never empty
  const displayNavigation = navigation.length > 0 ? navigation : navigationData;

  return (
    <nav className="font-sans relative z-40 w-full" data-cy="navbar" style={{ overflow: 'visible' }}>
      {/* Navigation Bar - Sticky */}
      <div 
        ref={bannerRef} 
        className={`bg-gradient-primary shadow-md transition-all duration-300 w-full ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-large' : 'relative'}`}
        style={{ overflow: 'visible', position: 'relative' }}
      >
        <div
          ref={navbarRef}
          className="w-full mx-auto px-2 sm:px-4 py-2 sm:py-3 relative"
          style={{ overflow: 'visible', position: 'relative' }}
        >
          <div className="w-full flex flex-wrap items-center justify-between gap-2" style={{ overflow: 'visible', position: 'relative' }}>
            {/* Mobile Logos - Left Side */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3 flex-shrink-0">
              <a href="/" className="h-10 w-12 flex items-center justify-center hover:opacity-90 transition-opacity">
                <img src={Logo} alt="Smart city logo" className="h-full w-full object-contain" />
              </a>
              <div className="ml-1">
                <a href="https://tmc.lsgkerala.gov.in/en/home" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity block">
                  <img className='h-10 object-contain' src={GovKerala} alt="Govt of kerala" />
                </a>
              </div>
            </div>

            {/* Desktop Search Button */}
            <div className="hidden lg:flex items-center">
              <button onClick={handleSearchToggle} className="text-white text-xl hover:text-accent-yellow transition-all p-2 rounded-md hover:bg-white/10" aria-label="Search">
                <IoSearch />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div 
              className="hidden lg:flex flex-1 justify-center items-center gap-1 xl:gap-2" 
              style={{ 
                position: 'relative', 
                overflow: 'visible'
              }}
            >
              {displayNavigation.map((item, index) => {
                const handleMouseEnter = () => {
                  if (dropdownTimeoutRef.current) {
                    clearTimeout(dropdownTimeoutRef.current);
                  }
                  setActiveDropdown(item.name);
                };

                const handleMouseLeave = () => {
                  // Add delay before closing dropdown to allow clicking
                  dropdownTimeoutRef.current = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 200);
                };

                return (
                  <div 
                    key={item.name || index} 
                    className="relative" 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                      position: 'relative',
                      zIndex: activeDropdown === item.name ? 10000 : 1
                    }}
                    ref={(el) => {
                      if (el) {
                        navItemRefs.current[item.name] = el;
                      }
                    }}
                  >
                    <NavLink
                      to={item.href || '#'}
                      className={({ isActive }) =>
                        `relative font-medium text-sm xl:text-base flex items-center px-2 xl:px-4 py-2 transition-all duration-200 whitespace-nowrap text-white hover:text-accent-yellow rounded-md hover:bg-white/10 ${isActive ? 'text-accent-yellow bg-white/10' : ''} after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:-translate-x-1/2 ${isActive ? 'after:w-3/4 after:bg-accent-yellow' : 'after:w-0 after:bg-accent-yellow group-hover:after:w-3/4'} after:transition-all after:duration-300`
                      }
                    >
                      {t(`navbar.${item.name}`, item.name)}
                      {((item.dropdown && item.dropdown.length > 0) || (item.pages && item.pages.length > 0)) && (
                        <RiArrowDropDownLine className={`ml-1 inline-block transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      )}
                    </NavLink>

                    {((item.dropdown && item.dropdown.length > 0) || (item.pages && item.pages.length > 0)) && activeDropdown === item.name && (
                      <div 
                        className="absolute bg-white shadow-2xl rounded-2xl py-3 w-auto min-w-[260px] max-w-[320px] border-0 overflow-hidden"
                        style={{ 
                          top: 'calc(100% + 12px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          position: 'absolute',
                          zIndex: 10001,
                          pointerEvents: 'auto',
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Arrow indicator */}
                        <div 
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"
                          style={{
                            boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.05)'
                          }}
                        ></div>
                        
                        {/* Gradient background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/30 opacity-50 pointer-events-none"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {item.dropdown && item.dropdown.map((sub, idx) => (
                            <NavLink 
                              key={sub.name || idx} 
                              to={sub.href} 
                              className={({ isActive }) => 
                                `group relative block px-5 py-3.5 text-sm transition-all duration-300 ${
                                  idx !== (item.dropdown?.length || 0) - 1 && !item.pages ? 'border-b border-gray-100' : ''
                                } ${
                                  isActive 
                                    ? 'text-[#1E6091] font-semibold bg-gradient-to-r from-blue-50 to-transparent' 
                                    : 'text-gray-700 hover:text-[#1E6091] hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent'
                                }`
                              }
                            >
                              <span className="relative z-10 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6091] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3"></span>
                                {t(`navbar.${sub.name}`, sub.name)}
                              </span>
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1E6091] to-[#184E77] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </NavLink>
                          ))}
                          {item.pages && item.pages.map((p, idx) => {
                            const isLast = idx === (item.pages?.length || 0) - 1;
                            const hasDropdown = item.dropdown && item.dropdown.length > 0;
                            return (
                              <NavLink 
                                key={p.name || idx} 
                                to={p.href} 
                                className={({ isActive }) => 
                                  `group relative block px-5 py-3.5 text-sm transition-all duration-300 ${
                                    !isLast || hasDropdown ? 'border-b border-gray-100' : ''
                                  } ${
                                    isActive 
                                      ? 'text-[#1E6091] font-semibold bg-gradient-to-r from-blue-50 to-transparent' 
                                      : 'text-gray-700 hover:text-[#1E6091] hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent'
                                  }`
                                }
                              >
                                <span className="relative z-10 flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6091] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3"></span>
                                  {t(`navbar.${p.name}`, p.name)}
                                </span>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1E6091] to-[#184E77] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Mobile Menu Button - Right Side */}
            <div className="flex lg:hidden items-center">
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all duration-200"
                aria-label="Toggle menu"
              >
                {menuOpen ? <RxCross1 className='text-xl sm:text-2xl text-white' /> : <GiHamburgerMenu className='text-xl sm:text-2xl text-white' />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu - Combined with Header items and Search */}
          {menuOpen && (
            <div className="lg:hidden bg-[#1E6091] text-white w-full px-4 py-4 space-y-3 mt-2 rounded-lg max-h-[85vh] overflow-y-auto">
              {/* Search Bar - Inside Mobile Menu */}
              <div className="border-b border-[#1E6091] pb-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <IoSearch className="text-xl text-gray-300" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('navbar.searchPlaceholder') || 'Search...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                      className="flex-1 border-2 border-white/30 bg-white/10 text-white placeholder-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-white focus:bg-white/20 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full bg-white text-primary-600 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium text-sm"
                  >
                    {t('navbar.Search') || 'Search'}
                  </button>
                </div>
              </div>

              {/* Header Items in Mobile Menu */}
              <div className="border-b border-[#1E6091] pb-3 space-y-2">
                <a href="tel:+91-0471-4010374" className="flex items-center gap-2 text-sm hover:text-gray-300 py-2">
                  <FaPhone className='w-4 h-4' />
                  <span>+91 - 0471 - 4010374</span>
                </a>
                <a href="mailto:info@smartcitytvm.in" className="flex items-center gap-2 text-sm hover:text-gray-300 py-2">
                  <MdEmail className='w-5 h-5' />
                  <span>info@smartcitytvm.in</span>
                </a>
                <button onClick={toggleLanguage} className="w-full flex items-center justify-start px-3 py-2 hover:bg-[#184E77] transition-colors text-sm rounded-md">
                  <span className="mr-2 font-medium">{i18n.language === 'en' ? 'EN' : 'ML'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </button>
                <a href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-[#184E77] transition-colors text-sm rounded-md">
                  <IoPhonePortraitOutline className='w-5 h-5' />
                  <span>{t('smart_app')}</span>
                </a>
              </div>

              {/* Navigation Items */}
              <div className="pt-2 space-y-1">
                {displayNavigation.map((item, idx) => (
                  <div key={item.name || idx}>
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between py-2.5 border-b border-[#1E6091] text-left hover:bg-[#184E77] rounded-md px-2 transition-colors"
                    >
                      <NavLink
                        to={item.href || '#'}
                        className="flex-1 font-medium"
                        onClick={() => {
                          if (!item.dropdown && (!item.pages || item.pages.length === 0)) {
                            setMenuOpen(false);
                          }
                        }}
                      >
                        {t(`navbar.${item.name}`, item.name)}
                      </NavLink>
                      {((item.dropdown && item.dropdown.length > 0) || (item.pages && item.pages.length > 0)) && (
                        <RiArrowDropDownLine className={`transition-transform text-xl ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    {((item.dropdown && item.dropdown.length > 0) || (item.pages && item.pages.length > 0)) && activeDropdown === item.name && (
                      <div className="pl-4 space-y-1 mt-1 bg-[#184E77] rounded-md py-2">
                        {item.dropdown && item.dropdown.map((sub, subIdx) => (
                          <NavLink
                            key={sub.name || subIdx}
                            to={sub.href}
                            className="block py-2 px-3 text-sm border-b border-[#1E6091] last:border-b-0 hover:bg-[#1E6091] hover:pl-4 transition-all rounded-md"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t(`navbar.${sub.name}`, sub.name)}
                          </NavLink>
                        ))}
                        {item.pages && item.pages.map((p, pIdx) => (
                          <NavLink
                            key={p.name || pIdx}
                            to={p.href}
                            className="block py-2 px-3 text-sm border-b border-[#1E6091] last:border-b-0 hover:bg-[#1E6091] hover:pl-4 transition-all rounded-md"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t(`navbar.${p.name}`, p.name)}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Search Bar */}
          {showSearch && (
            <div className="hidden lg:flex w-full bg-white px-2 sm:px-4 py-3 justify-center items-center gap-2 border-t border-gray-200 shadow-md animate-fade-in-up mt-2 rounded-lg">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t('navbar.searchPlaceholder') || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="w-full max-w-md border-2 border-primary-300 rounded-lg px-4 py-2.5 text-base outline-none text-gray-800 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all"
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-gradient-primary text-white px-6 py-2.5 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
              >
                {t('navbar.Search') || 'Search'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
