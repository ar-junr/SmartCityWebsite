import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '../../assets/banners/videoBanner.jpg';
import { FaYoutube } from 'react-icons/fa6';

const extractYouTubeID = (url) => {
  const regex = /(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/videos/')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden" data-aos="fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Video Gallery</h1>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 text-center" data-aos="fade-up">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore our collection of videos showcasing the progress, initiatives, and achievements of Smart City Thiruvananthapuram
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {videos.map((video, index) => {
            const videoId = extractYouTubeID(video.youtube_url);
            return (
              videoId && (
                <div
                  key={video.id}
                  className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Smart City TVM</span>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>

        {/* Gallery Statistics */}
        <div className="mt-16 bg-white shadow-sm p-8" data-aos="fade-up">
          <h3 className="text-2xl font-semibold text-center mb-8 text-[#184E77]">Gallery Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1E6091]">{videos.length}</div>
              <p className="text-gray-600 mt-2">Videos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E6091]">24K+</div>
              <p className="text-gray-600 mt-2">Views</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E6091]">6+</div>
              <p className="text-gray-600 mt-2">Categories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E6091]">1.2K+</div>
              <p className="text-gray-600 mt-2">Comments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#184E77] text-white py-16" data-aos="fade-in">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Stay Updated with Our Progress</h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-300">
            Subscribe to our YouTube channel for the latest videos on Smart City projects and initiatives
          </p>
          <a
            href="https://www.youtube.com/@smartcitythiruvananthapura7226/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold py-3 px-6 transition duration-300"
          >
            <FaYoutube className='mr-2 text-2xl' />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
