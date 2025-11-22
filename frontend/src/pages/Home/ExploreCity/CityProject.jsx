import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import Banner from '../../../assets/banners/cityProjectBanner.jpg';
import Image1 from '../../../assets/images/City Profile/project-area-1.jpg';
import Image2 from '../../../assets/images/City Profile/project-area-2.jpg';

const CityProject = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: Image1, alt: "Project Area View 1" },
    { src: Image2, alt: "Project Area View 2" }
  ];

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImage();
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Project Area
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#184E77] mb-4">Project Area Maps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1PC7Mz3W1C0lOYO2O_YkFnI3FA8S0n-Yl"
                className="w-full h-full border-none"
                title="ABD Area Map 1"
              ></iframe>
            </div>
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1Kpth2hhcaxodjzUOWcuz6qa3Iiaej7el"
                className="w-full h-full border-none"
                title="ABD Area Map 2"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#184E77] mb-4">Project Area Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="bg-white shadow-sm overflow-hidden cursor-pointer"
                onClick={() => openImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-[#184E77]">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center m-10">
        <a
          href="/city-profile"
          className="inline-flex items-center px-6 py-3 bg-[#184E77] text-white hover:bg-[#1E6091] transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to City Profile
        </a>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div
            className="relative w-full h-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-200 z-50"
            >
              <IoCloseOutline className="text-3xl" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityProject;
