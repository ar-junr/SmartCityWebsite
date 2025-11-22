import React, { useRef, useEffect, useState } from 'react';
import Banner from '../../assets/banners/convergenceBanner.png';
import Image1 from '../../assets/images/Convergence Projects/padmanabha_temple.jpg';
import Image2 from '../../assets/images/Convergence Projects/drainage.jpg';
import Image3 from '../../assets/images/Convergence Projects/housing.jpg';
import Image4 from '../../assets/images/Convergence Projects/kerala_portal.jpg';
import Image5 from '../../assets/images/Convergence Projects/mlcp_amrut.jpg';
import Image6 from '../../assets/images/Convergence Projects/parks_tvm.jpg';
import Image7 from '../../assets/images/Convergence Projects/ugd_netwrok.jpg';
import Image8 from '../../assets/images/Convergence Projects/waste_management.jpg';
import Image9 from '../../assets/images/Convergence Projects/water_supply.jpg';

const ConvergenceProject = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollInterval = useRef(null);
  
  const projects = [
    { title: "Renovation of Padmanabha Swami Temple Precinct",image: Image1 },
    { title: "Storm Water Drains",image: Image2 },
    { title: "Integrated social housing complex",image: Image3 },
    { title: "Kerala Portal",image: Image4 },
    { title: "Multilevel car parking AMRUT",image: Image5 },
    { title: "Development of parks at Trivandrum",image: Image6 },
    { title: "UGD network system",image: Image7 },
    { title: "Decentralized solid waste management by TMC",image: Image8 },
    { title: "24x7 water supply",image: Image9  }
  ];
  // Hide scrollbar globally for the carousel
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % projects.length;
      scrollToProjectIndex(nextIndex);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoScrollInterval.current);
  }, [currentIndex]);

  const scrollToProjectIndex = (index) => {
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * index;
    
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
  };

  const scrollToProject = (direction) => {
    // Reset auto-scroll timer when user manually navigates
    clearInterval(autoScrollInterval.current);
    
    const newIndex = direction === 'left' 
      ? (currentIndex - 1 + projects.length) % projects.length
      : (currentIndex + 1) % projects.length;
    
    scrollToProjectIndex(newIndex);
    
    // Restart auto-scroll
    autoScrollInterval.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % projects.length;
      scrollToProjectIndex(nextIndex);
    }, 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Convergence Projects</h1>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden h-108">
        {/* Carousel - hide-scrollbar class added here */}
        <div 
          ref={carouselRef}
          className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full snap-start relative"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#184E77] to-transparent p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => scrollToProject('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#1E6091] bg-opacity-80 text-white p-3 hover:bg-opacity-100 transition"
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => scrollToProject('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#1E6091] bg-opacity-80 text-white p-3 hover:bg-opacity-100 transition"
          aria-label="Next project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-6 pb-8">
        {projects.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              clearInterval(autoScrollInterval.current);
              scrollToProjectIndex(index);
              autoScrollInterval.current = setInterval(() => {
                const nextIndex = (currentIndex + 1) % projects.length;
                scrollToProjectIndex(nextIndex);
              }, 5000);
            }}
            className={`w-3 h-3 mx-1 transition ${currentIndex === index ? 'bg-[#1E6091]' : 'bg-gray-300 hover:bg-[#1E6091]'}`}
            aria-label={`Go to project ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ConvergenceProject;