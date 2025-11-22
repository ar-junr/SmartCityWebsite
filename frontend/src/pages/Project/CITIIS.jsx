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
    <div className="min-h-screen bg-white font-sans">
      <div className="relative h-64 md:h-96 w-full overflow-hidden" data-aos="fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(24, 78, 119, 0.7)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            CITIIS 2.0
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-3xl drop-shadow-lg">
            City Investments to Innovate, Integrate and Sustain
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-gray-50" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-6 relative pb-2">
                About CITIIS 2.0
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#1E6091]"></div>
              </h2>
              <div className="bg-gray-200 border-2 border-dashed w-full h-64 flex items-center justify-center text-gray-500">
                <img src={Image} alt="CITIIS 2.0 Infographic" className="w-full h-full" />
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1E6091] mb-2">Program Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  CITIIS (City Investments to Innovate, Integrate and Sustain) is a flagship program under the 
                  Government of India's Smart Cities Mission. CITIIS 2.0 represents a strategic partnership 
                  between the Ministry of Housing and Urban Affairs (MoHUA) and international development 
                  agencies to foster sustainable urban development.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1E6091] mb-2">Strategic Focus Areas</h3>
                <p className="text-gray-700 leading-relaxed">
                  The program provides financial and technical assistance for:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Promoting circular economy through integrated waste management at city level</li>
                  <li>Climate-oriented reform actions at state level</li>
                  <li>Institutional strengthening and knowledge management at national level</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1E6091] mb-2">International Collaboration</h3>
                <p className="text-gray-700 leading-relaxed">
                  Conceived by MoHUA in collaboration with AFD, KfW (German Development Bank), European Union, 
                  and National Institute of Urban Affairs (NIUA), CITIIS 2.0 addresses critical urban challenges 
                  while contributing to India's commitments under the Paris Agreement and Sustainable Development Goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-down">
            <h2 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-3">
              CITIIS Project Gallery
            </h2>
            <div className="w-20 h-1 bg-[#1E6091] mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Showcasing innovative urban development projects under the CITIIS program
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openLightbox(image)}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#184E77] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-semibold text-[#184E77]">{image.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
