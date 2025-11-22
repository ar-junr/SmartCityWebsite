import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/pageBanner.jpg';

const Inauguration = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.INAUGURATION_IMAGES))
      .then((response) => {
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch inauguration images:", error);
        setLoading(false);
      });
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
    <div className="bg-gray-50 min-h-screen" data-cy="inauguration-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || ''})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Inauguration Gallery
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Inauguration Gallery</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Official records of our milestone events
          </p>
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading images...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  data-cy={`inauguration-card-${index}`}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openImage(image)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={API_CONFIG.getMediaUrl(image.image)}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No images available</p>
          </div>
        )}

        {/* Fullscreen Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <div
              className="relative w-full h-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={API_CONFIG.getMediaUrl(selectedImage.image)}
                alt={selectedImage.alt}
                className="max-h-full max-w-full object-contain"
              />
              {selectedImage.alt && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black/50 px-4 py-2 rounded">
                  {selectedImage.alt}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Inauguration;