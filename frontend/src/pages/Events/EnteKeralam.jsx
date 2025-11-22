import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image1 from '../../assets/images/ente keralam/ente-keralam-image1.jpg';
import Image2 from '../../assets/images/ente keralam/ente-keralam-image2.jpg';
import Image3 from '../../assets/images/ente keralam/ente-keralam-image3.jpeg';
import Image4 from '../../assets/images/ente keralam/ente-keralam-image4.jpeg';
import Image5 from '../../assets/images/ente keralam/ente-keralam-image5.jpeg';
const EnteKeralam = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const images = [
    { src: Image1, alt: "Ente Keralam 1" },
    { src: Image2, alt: "Ente Keralam 2" },
    { src: Image3, alt: "Ente Keralam 3" },
    { src: Image4, alt: "Ente Keralam 4" },
    { src: Image5, alt: "Ente Keralam 5" }
  ];
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };
  return (
    <div className="w-full bg-white" data-cy="ente-keralam-page">
      <div className="bg-gradient-to-r from-[#184E77] to-[#1E6091] text-white py-8" data-aos="fade-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center tracking-wide">
            Ente Keralam
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>
      </div>
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-gray-100" data-aos="fade-up">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                data-cy="ente-keralam-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#184E77]/80 hover:bg-[#184E77] text-white p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#184E77]/80 hover:bg-[#184E77] text-white p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-[#184E77]/80 hover:bg-[#184E77] text-white px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="bg-[#1E6091] text-white py-4" data-aos="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base font-medium">
            Image {currentSlide + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};
export default EnteKeralam;