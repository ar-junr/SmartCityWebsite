import React, { useEffect, useState } from 'react';
import { Users, Video, Calendar, Award } from 'lucide-react';
import Poster from '../../assets/images/conclave/poster.jpg';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/conclaveBanner.jpg';

const Conclave = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [speakers, setSpeakers] = useState([]);
  const [recordings, setRecordings] = useState([]);

  // Helper function to get the YouTube embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  };

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CONCLAVE_SPEAKERS))
      .then(res => {
        setSpeakers(res.data.map(sp => ({
          ...sp,
          image: sp.image?.startsWith('http') ? sp.image : API_CONFIG.getMediaUrl(sp.image)
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load speakers", err);
        setLoading(false);
      });

    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CONCLAVE_RECORDINGS))
      .then(res => setRecordings(res.data))
      .catch(err => console.error("Failed to load recordings", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="conclave-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || Poster})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            {t('conclave.about.title') || 'Conclave'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('conclave.about.title') || 'Conclave'}</h2>
          </div>
          <p className="text-gray-600 mt-2">
            {t('conclave.about.paragraphs', { returnObjects: true })?.[0] || 'Smart City Conclave event'}
          </p>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">About the Conclave</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                {t('conclave.about.paragraphs', { returnObjects: true })?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{t('conclave.stats.title')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {t('conclave.stats.items', { returnObjects: true })?.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 text-center rounded-lg">
                      <div className="text-2xl font-bold text-[#1E6091] mb-1">{item.count}</div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Focus Areas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#1E6091]" />
                <h3 className="text-xl font-bold text-gray-900">{t('conclave.focus.title')}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t('conclave.focus.items', { returnObjects: true })?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-[#1E6091] mt-1">•</div>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recordings */}
        {recordings.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-[#1E6091]" />
                  <h3 className="text-xl font-bold text-gray-900">{t('conclave.recordings.title')}</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-cy="recordings-section">
                {recordings.map((rec, idx) => (
                  <div key={idx}>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getEmbedUrl(rec.youtube_link)}
                        title={rec.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mt-3">{rec.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{rec.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Speakers */}
        {speakers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-6 md:p-8">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-[#1E6091]" />
                  <h3 className="text-xl font-bold text-gray-900">{t('conclave.speakers.title')}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {speakers.map((sp, idx) => (
                  <div key={idx} className="text-center">
                    <div className="aspect-square overflow-hidden rounded-lg mb-3">
                      <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{sp.name}</h4>
                    <p className="text-gray-600 text-xs mt-1">{sp.designation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{t('conclave.highlights.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t('conclave.highlights.items', { returnObjects: true })?.map((item, i) => (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Conclave;