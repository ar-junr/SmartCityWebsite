import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Inauguration = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/inauguration-images/')
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Failed to fetch inauguration images:", error));
  }, []);

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
      if (e.key === 'Escape') {
        closeImage();
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" data-cy="inauguration-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-[#184E77]">Inauguration Gallery</h1>
          <p className="mt-2 text-gray-600">Official records of our milestone events</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              data-cy={`inauguration-card-${index}`}
              className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => openImage(image)}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-[#1E6091] bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              <div className="p-3 bg-white border-t border-gray-100">
                <p className="text-sm font-medium text-[#184E77]">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Fullscreen Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
            data-aos="fade-in"
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
                src={selectedImage.image}
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
    </div>
  );
};
export default Inauguration;