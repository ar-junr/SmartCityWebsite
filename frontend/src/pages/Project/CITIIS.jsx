import React, { useState, useEffect } from 'react';
import Image from '../../assets/images/CIITS 2.0/image.png';
import Banner from '../../assets/banners/citiisBanner.png';
import Image1 from '../../assets/images/CIITS 2.0/img1.jpg';
import Image2 from '../../assets/images/CIITS 2.0/img2.jpg';
import Image3 from '../../assets/images/CIITS 2.0/img3.jpg';
import Image4 from '../../assets/images/CIITS 2.0/img4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CITIIS = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const images = [
    {
      id: 1,
      src: Image1,
      alt: "CITIIS Project",
      title: "CITIIS Workshop",
      description: "Officials from Trivandrum Smart City Ltd take part in initiation wrorkshop for CITIIS 2.0"
    },
    {
      id: 2,
      src: Image2,
      alt: "CITIIS Workshop",
      title: "Stakeholder Engagement",
      description: "Onsite mission to Trivandrum by AFD & NIUA Officials"
    },
    {
      id: 3,
      src: Image3,
      alt: "CITIIS Implementation",
      title: "Project Implementation",
      description: "Initiation workshop with 18 Smart Cities selected under the CITIIS 2.0 program"
    },
    {
      id: 4,
      src: Image4,
      alt: "CITIIS Partnership",
      title: "Our Team",
      description: "Our leaders representing Trivandrum Smart City Ltd at the CITIIS 2.0 program"
    }
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              CITIIS 2.0
            </h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              City Investments to Innovate, Integrate and Sustain
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">About CITIIS 2.0</h2>
              <p className="text-gray-600 text-sm">
                A flagship program under the Government of India's Smart Cities Mission
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img src={Image} alt="CITIIS 2.0 Infographic" className="w-full rounded-lg" />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1E6091] mb-2">Program Overview</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    CITIIS (City Investments to Innovate, Integrate and Sustain) is a flagship program under the 
                    Government of India's Smart Cities Mission. CITIIS 2.0 represents a strategic partnership 
                    between the Ministry of Housing and Urban Affairs (MoHUA) and international development 
                    agencies to foster sustainable urban development.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#1E6091] mb-2">Strategic Focus Areas</h3>
                  <p className="text-gray-700 text-sm mb-2">The program provides financial and technical assistance for:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                    <li>Promoting circular economy through integrated waste management at city level</li>
                    <li>Climate-oriented reform actions at state level</li>
                    <li>Institutional strengthening and knowledge management at national level</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#1E6091] mb-2">International Collaboration</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Conceived by MoHUA in collaboration with AFD, KfW (German Development Bank), European Union, 
                    and National Institute of Urban Affairs (NIUA), CITIIS 2.0 addresses critical urban challenges 
                    while contributing to India's commitments under the Paris Agreement and Sustainable Development Goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">CITIIS Project Gallery</h2>
              <p className="text-gray-600 text-sm">
                Showcasing innovative urban development projects under the CITIIS program
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{image.title}</h3>
                    <p className="text-xs text-gray-600">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 lightbox-backdrop"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-6xl max-h-full" data-aos="zoom-in">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white p-1 max-w-[90vw] max-h-[90vh]">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{currentImage.title}</h3>
              <p className="text-gray-300">{currentImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CITIIS;
