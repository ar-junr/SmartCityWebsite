import React from 'react';
import { useEffect } from 'react';
import HomeItem1 from '../../components/home/HomeItem1';
import HomeItem2 from '../../components/home/HomeItem2';
import HomeItem3 from '../../components/home/HomeItem3';
import HomeItem4 from '../../components/home/HomeItem4';
import Coverpage from '../../assets/images/coverpageImage.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
const HomePage = () => {
  useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
  });
}, []);
  return (
    <div data-cy="homepage" className="min-h-screen">
      {/* Cover Image with Zoom Out Animation */}
      <div className="w-full h-[65vh] md:h-[70vh] relative overflow-hidden">
        <img
          src={Coverpage}
          alt="Cover Page"
          className="w-full h-full object-cover animate-zoom-out"
          style={{
            animation: 'zoomOut 8s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Sections with staggered entrance animations */}
      <div className="bg-gradient-light">
        <div className="animate-fade-in-up" data-aos="fade-up" data-aos-delay="100">
          <HomeItem4 />
        </div>
        <div className="animate-fade-in-up" data-aos="fade-up" data-aos-delay="200">
          <HomeItem1 />
        </div>
        <div className="animate-fade-in-up" data-aos="fade-up" data-aos-delay="300">
          <HomeItem2 />
        </div>
        <div className="animate-fade-in-up" data-aos="fade-up" data-aos-delay="400">
          <HomeItem3 />
        </div>
      </div>
    </div>
  );
};

export default HomePage;