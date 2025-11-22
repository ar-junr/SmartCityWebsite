import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/pageBanner.jpg';

const Anniversary = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ANNIVERSARY_IMAGES))
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching anniversary images:", error);
        setLoading(false);
      });
  }, []);
  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);
  return (
    <div className="bg-gray-50 min-h-screen" data-cy="anniversary-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || ''})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Celebrating 8 Years of Excellence
            </h1>
            <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Journey through our milestone moments, cherished memories, and the people who made it all possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {images[0]?.title || 'Anniversary Gallery'}
            </h2>
          </div>
          <p className="text-gray-600 mt-2">
            Celebrating our journey and achievements over the years
          </p>
        </div>

        {/* Gallery */}
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
                  className="group relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openLightbox(image)}
                  data-cy={`anniversary-image-${index}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={API_CONFIG.getMediaUrl(image.image)}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs">{image.alt}</p>
                    </div>
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
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white overflow-hidden rounded-lg shadow-2xl">
              <img
                src={API_CONFIG.getMediaUrl(selectedImage.image)}
                alt={selectedImage.alt}
                className="w-full max-h-[70vh] object-contain"
              />
              {selectedImage.alt && (
                <div className="p-4 bg-[#1E6091] text-white">
                  <p className="text-sm">{selectedImage.alt}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Anniversary;