import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled 1/4th of viewport height
      const quarterScreenHeight = window.innerHeight / 4;
      if (window.pageYOffset > quarterScreenHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`} data-cy="scroll-to-top-button">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gradient-primary text-white p-4 rounded-full shadow-large hover:shadow-glow hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <IoMdArrowRoundUp className='text-2xl' />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;