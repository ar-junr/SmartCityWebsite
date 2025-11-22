import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play, Pause } from 'lucide-react';
import Image1 from '../../assets/images/ente keralam/ente-keralam-image1.jpg';
import Image2 from '../../assets/images/ente keralam/ente-keralam-image2.jpg';
import Image3 from '../../assets/images/ente keralam/ente-keralam-image3.jpeg';
import Image4 from '../../assets/images/ente keralam/ente-keralam-image4.jpeg';
import Image5 from '../../assets/images/ente keralam/ente-keralam-image5.jpeg';
import Banner from '../../assets/banners/pageBanner.jpg';

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
    <div className="bg-gray-50 min-h-screen" data-cy="ente-keralam-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || images[0]?.src})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Ente Keralam
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ente Keralam</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Showcasing the beauty and progress of Kerala
          </p>
        </div>

        {/* Image Slider */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#1E6091]/80 hover:bg-[#1E6091] text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#1E6091]/80 hover:bg-[#1E6091] text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-[#1E6091]/80 hover:bg-[#1E6091] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>
          </div>

          {/* Slide Counter */}
          <div className="bg-[#1E6091] text-white py-3 text-center">
            <p className="text-sm font-medium">
              Image {currentSlide + 1} of {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnteKeralam;