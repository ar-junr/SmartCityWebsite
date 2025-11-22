// same imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../assets/banners/photoBanner.jpg';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PhotoGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, disable: () => window.Cypress });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/albums/')
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error loading albums:', err));
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
      <div className="relative h-48 md:h-64 w-full overflow-hidden" data-aos="fade-in" data-cy="photo-banner">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})` }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold text-center" data-cy="photo-gallery-title">Photo Gallery</h1>
        </div>
      </div>

      {/* Album Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12" data-aos="fade-up" data-cy="album-grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openAlbum(index)}
              data-cy={`album-card-${album.id}`}
              data-aos="zoom-in"
            >
              <div className="relative">
                <img src={album.thumbnail} alt={album.title} className="w-full h-48 object-cover" data-cy="album-thumbnail" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-lg font-bold" data-cy="album-title">{album.title}</h3>
                  <p className="text-gray-300 text-sm" data-cy="album-photo-count">{album.photos.length} photos</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Album View */}
      {viewMode === 'album' && activeAlbum !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto p-4" data-aos="fade-in" data-cy="album-view">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white" data-cy="album-title-view">{albums[activeAlbum].title}</h2>
              <button onClick={closeModal} className="text-white text-3xl hover:text-gray-300" data-cy="album-close-btn">&times;</button>
            </div>
            <div data-cy="photo-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {albums[activeAlbum].photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => openImage(index)}
                  data-aos="zoom-in"
                  data-cy={`photo-thumbnail-${index}`}
                >
                  <img
                    src={photo.image}
                    alt={photo.caption || `Image ${index + 1}`}
                    className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity"
                    data-cy="photo-thumbnail"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                    <HiOutlineSearch className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
          className="fixed inset-0 bg-black bg-opacity-95 z-60 flex items-center justify-center"
          data-cy="single-photo-view"
        >
          <div onClick={closeModal} className="absolute inset-0" />

          <div
            className="relative max-h-[90vh] max-w-[90vw] z-10"
            data-cy="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={closeModal}
              data-cy="close-modal"
            >
              <HiOutlineX className="h-8 w-8" />
            </button>

            <img
              src={albums[activeAlbum].photos[currentImageIndex].image}
              alt="gallery"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              data-cy="modal-image"
            />

            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-80" data-cy="photo-counter">
              {currentImageIndex + 1} of {albums[activeAlbum].photos.length}
            </div>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              data-cy="prev-btn"
            >
              <IoIosArrowBack />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              data-cy="next-btn"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-8" data-cy="gallery-stats">
        <div className="bg-white shadow-md p-6">
          <h3 className="text-xl font-bold text-center mb-4 text-[#1E6091]" data-cy="stats-title">Gallery Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div data-cy="stat-albums">
              <div className="text-3xl font-bold text-[#1E6091]">{albums.length}</div>
              <p className="text-gray-600">Albums</p>
            </div>
            <div data-cy="stat-photos">
              <div className="text-3xl font-bold text-[#1E6091]">
                {albums.reduce((total, album) => total + album.photos.length, 0)}
              </div>
              <p className="text-gray-600">Photos</p>
            </div>
            <div data-cy="stat-categories">
              <div className="text-3xl font-bold text-[#1E6091]">{albums.length}</div>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
