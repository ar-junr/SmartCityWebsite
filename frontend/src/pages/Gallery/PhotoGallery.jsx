import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/photoBanner.jpg';

const PhotoGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ALBUMS))
      .then(res => {
        setAlbums(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading albums:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const modal = document.querySelector('[data-cy="modal-image"]');
      if (modal) {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isModalOpen]);

  const openAlbum = (index) => {
    setActiveAlbum(index);
    setCurrentImageIndex(0);
    setViewMode('album');
  };

  const openImage = (index) => {
    setCurrentImageIndex(index);
    setViewMode('single');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (viewMode === 'single') {
      setViewMode('album');
    } else {
      setViewMode('grid');
      setActiveAlbum(null);
      setCurrentImageIndex(0);
    }
  };

  const navigateImage = (direction) => {
    const album = albums[activeAlbum];
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % album.photos.length
      : (currentImageIndex - 1 + album.photos.length) % album.photos.length;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode === 'single') {
        if (e.key === 'ArrowRight') navigateImage('next');
        else if (e.key === 'ArrowLeft') navigateImage('prev');
        else if (e.key === 'Escape') closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentImageIndex, activeAlbum]);

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="photo-gallery-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden" data-cy="photo-banner">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4" data-cy="photo-gallery-title">
            Photo Gallery
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Photo Gallery</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Explore our collection of photos showcasing Smart City initiatives
          </p>
        </div>

        {/* Album Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading albums...</p>
          </div>
        ) : albums.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-cy="album-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openAlbum(index)}
                  data-cy={`album-card-${album.id}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={API_CONFIG.getMediaUrl(album.thumbnail)}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-cy="album-thumbnail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-lg font-bold mb-1" data-cy="album-title">{album.title}</h3>
                        <p className="text-gray-200 text-sm" data-cy="album-photo-count">{album.photos.length} photos</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{album.title}</h3>
                    <p className="text-gray-600 text-xs">{album.photos.length} photos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No albums available</p>
          </div>
        )}
      </div>

      {/* Album View */}
      {viewMode === 'album' && activeAlbum !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-4" data-cy="album-view">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white" data-cy="album-title-view">{albums[activeAlbum].title}</h2>
              <button onClick={closeModal} className="text-white hover:text-gray-300 transition-colors" data-cy="album-close-btn">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div data-cy="photo-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {albums[activeAlbum].photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => openImage(index)}
                  data-cy={`photo-thumbnail-${index}`}
                >
                  <img
                    src={API_CONFIG.getMediaUrl(photo.image)}
                    alt={photo.caption || `Image ${index + 1}`}
                    className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity"
                    data-cy="photo-thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                    <Search className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Image View */}
      {viewMode === 'single' && activeAlbum !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          data-cy="single-photo-view"
        >
          <div onClick={closeModal} className="absolute inset-0" />

          <div
            className="relative max-h-[90vh] max-w-[90vw] z-10"
            data-cy="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={closeModal}
              data-cy="close-modal"
            >
              <X className="h-8 w-8" />
            </button>

            <img
              src={API_CONFIG.getMediaUrl(albums[activeAlbum].photos[currentImageIndex].image)}
              alt="gallery"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              data-cy="modal-image"
            />

            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 px-4 py-2 rounded" data-cy="photo-counter">
              {currentImageIndex + 1} of {albums[activeAlbum].photos.length}
            </div>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              data-cy="prev-btn"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              data-cy="next-btn"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      {albums.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6" data-cy="gallery-stats">
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900" data-cy="stats-title">Gallery Statistics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div data-cy="stat-albums">
              <div className="text-3xl font-bold text-[#1E6091]">{albums.length}</div>
              <p className="text-gray-600 text-sm mt-1">Albums</p>
            </div>
            <div data-cy="stat-photos">
              <div className="text-3xl font-bold text-[#1E6091]">
                {albums.reduce((total, album) => total + album.photos.length, 0)}
              </div>
              <p className="text-gray-600 text-sm mt-1">Photos</p>
            </div>
            <div data-cy="stat-categories">
              <div className="text-3xl font-bold text-[#1E6091]">{albums.length}</div>
              <p className="text-gray-600 text-sm mt-1">Categories</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
