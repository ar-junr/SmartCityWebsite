import React, { useEffect, useState } from 'react';
import { Video as VideoIcon, Youtube } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/videoBanner.jpg';
import { FaYoutube } from 'react-icons/fa6';

const extractYouTubeID = (url) => {
  const regex = /(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.VIDEOS))
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Video Gallery
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <VideoIcon className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Video Gallery</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Explore our collection of videos showcasing the progress, initiatives, and achievements of Smart City Thiruvananthapuram
          </p>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, index) => {
                const videoId = extractYouTubeID(video.youtube_url);
                return (
                  videoId && (
                    <div
                      key={video.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{video.title}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Youtube className="w-4 h-4 mr-1 text-red-600" />
                          <span>Smart City TVM</span>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <VideoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No videos available</p>
          </div>
        )}

        {/* Gallery Statistics */}
        {videos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Gallery Statistics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#1E6091]">{videos.length}</div>
                <p className="text-gray-600 text-sm mt-1">Videos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1E6091]">24K+</div>
                <p className="text-gray-600 text-sm mt-1">Views</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1E6091]">6+</div>
                <p className="text-gray-600 text-sm mt-1">Categories</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1E6091]">1.2K+</div>
                <p className="text-gray-600 text-sm mt-1">Comments</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-[#1E6091] rounded-lg shadow-sm border border-gray-200 p-8 mt-6 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">Stay Updated with Our Progress</h2>
          <p className="mb-6 text-gray-200 max-w-2xl mx-auto">
            Subscribe to our YouTube channel for the latest videos on Smart City projects and initiatives
          </p>
          <a
            href="https://www.youtube.com/@smartcitythiruvananthapura7226/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
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
