import React, { useEffect, useState } from 'react';
import Poster from '../../assets/images/conclave/poster.jpg';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useTranslation } from 'react-i18next';

const Conclave = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
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
    AOS.init({ once: true, duration: 800 });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/conclave-speakers/')
      .then(res => setSpeakers(res.data.map(sp => ({
        ...sp,
        image: sp.image.startsWith('http') ? sp.image : `http://localhost:8000${sp.image}`
      }))))
      .catch(err => console.error("Failed to load speakers", err));

    axios.get('http://localhost:8000/api/conclave-recordings/')
      .then(res => setRecordings(res.data))
      .catch(err => console.error("Failed to load recordings", err));
  }, []);

  return (
    <div className="min-h-screen" data-cy="conclave-page">
      <div className="relative h-screen w-full" data-aos="fade-in">
        <img src={Poster} alt={t('conclave.posterAlt')} className="w-full h-full object-cover" />
      </div>
      <div id="content" className="px-14 py-12 bg-gray-100">
        {/* About Section */}
        <div className="mb-16" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('conclave.about.title')}</h2>
            <div className="w-32 h-1 bg-[#184E77] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-gray-700">
              {t('conclave.about.paragraphs', { returnObjects: true }).map((p, i) =>
                <p key={i}>{p}</p>
              )}
            </div>
            <div className="bg-gray-100 p-8 flex items-center justify-center" data-aos="zoom-in">
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('conclave.stats.title')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {t('conclave.stats.items', { returnObjects: true }).map((item, idx) => (
                    <div key={idx} className="bg-white p-4 text-center" data-aos="fade-up" data-aos-delay={idx * 100}>
                      <div className="text-3xl font-bold text-[#184E77] mb-2">{item.count}</div>
                      <div className="text-gray-700">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Key Focus Areas */}
        <div className="w-full p-2 bg-gray-100 mb-10" data-aos="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('conclave.focus.title')}</h2>
            <div className="w-32 h-1 bg-[#184E77] mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t('conclave.focus.items', { returnObjects: true }).map((item, i) => (
                <div key={i} className="flex items-start" data-aos="fade-right" data-aos-delay={i * 50}>
                  <div className="text-[#184E77] mr-3 mt-1">•</div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recordings */}
        <div className="mb-16" data-aos="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('conclave.recordings.title')}</h2>
            <div className="w-32 h-1 bg-[#184E77] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-cy="recordings-section">
            {recordings.map((rec, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getEmbedUrl(rec.youtube_link)} // <-- Use the helper function here
                    title={rec.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-4">{rec.title}</h3>
                <p className="text-gray-600 mt-2">{rec.date}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Speakers */}
        <div className="mb-16" data-aos="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('conclave.speakers.title')}</h2>
            <div className="w-32 h-1 bg-[#184E77] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((sp, idx) => (
              <div key={idx} className="flex flex-col h-full" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="aspect-square overflow-hidden mb-4">
                  <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{sp.name}</h3>
                  <p className="text-gray-600 mt-2">{sp.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Highlights */}
        <div className="py-16 bg-gray-100" data-aos="fade-up">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('conclave.highlights.title')}</h2>
              <div className="w-32 h-1 bg-[#184E77] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t('conclave.highlights.items', { returnObjects: true }).map((item, i) => (
                <div key={i} className="text-center p-6" data-aos="fade-up" data-aos-delay={i * 100}>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
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