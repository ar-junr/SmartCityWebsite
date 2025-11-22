import React from 'react';
import VisionBanner from '../../assets/banners/visionBanner.jpg';

const VisionBannerSection = () => {
  return (
    <div className="w-full">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${VisionBanner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center tracking-tight drop-shadow-md">
            Vision & Strategy
          </h1>
          <div className="w-24 h-1 bg-white mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default VisionBannerSection;