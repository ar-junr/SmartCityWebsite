import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from '../../assets/images/SCTLLogo.png';
import { FaXTwitter, FaClock, FaCalendar } from "react-icons/fa6";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { MdPeople } from "react-icons/md";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const [mediaItems, setMediaItems] = useState([]);
  const [eventItems, setEventItems] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLogoExpanded, setIsLogoExpanded] = useState(false); // New state for logo expansion

  useEffect(() => {
    console.log("Visitor useEffect running");
    const hasVisited = localStorage.getItem('hasVisited');

    const endpoint = hasVisited
      ? 'http://127.0.0.1:8000/api/visitors/?skip_increment=true'
      : 'http://127.0.0.1:8000/api/visitors/';

    axios.get(endpoint)
      .then(res => {
        console.log("Visitor response:", res.data);
        setVisitorCount(res.data.count);
        if (!hasVisited) {
          localStorage.setItem('hasVisited', 'true');
        }
      })
      .catch(err => console.error("Error fetching visitor count:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/media/')
      .then(res => setMediaItems(res.data))
      .catch(err => console.error("Error fetching media items:", err));

    axios.get('http://127.0.0.1:8000/api/events/')
      .then(res => setEventItems(res.data))
      .catch(err => console.error("Error fetching event items:", err));
  }, []);

  const handleLogoClick = () => {
    setIsLogoExpanded(!isLogoExpanded);
  };

  return (
    <footer className="bg-gradient-primary text-white px-6 md:px-16 py-12 w-full shadow-lg" data-aos="fade-up" data-cy="footer">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div data-aos="fade-up" className="space-y-4">
          <img
            src={Logo}
            alt="Smart City Thiruvananthapuram Logo"
            className={`w-28 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 ${
              isLogoExpanded ? 'w-full' : ''
            }`}
            onClick={handleLogoClick}
          />
          <p className="text-sm leading-relaxed mb-4 text-gray-200">
            {t('footer.description')}
          </p>
          <div className="space-y-2 text-sm bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="flex items-center gap-2 text-gray-100"><span className="text-accent-yellow"><FaCalendar /></span> {formattedDate}</p>
            <p className="flex items-center gap-2 text-gray-100"><span className="text-accent-yellow"><FaClock /></span> {formattedTime}</p>
            <p className="flex items-center gap-2 text-gray-100"><MdPeople className="text-lg text-accent-yellow" /> {t('footer.visitors')}: <span className="font-semibold text-white">{visitorCount.toLocaleString()}</span></p>
          </div>
        </div>

        {/* Column 2: In Media */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-accent-yellow pb-2">{t('footer.in_media')}</h3>
          <ul className="space-y-4 text-sm">
            {mediaItems.map((item) => (
              <li key={item.id} className="flex gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-10 object-cover rounded group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="flex-1">
                  <Link
                    to={`/footer-news/${item.id}`}
                    className="font-semibold hover:text-accent-yellow transition-colors block mb-1"
                  >
                    {item.title}
                  </Link>
                  <span className="text-gray-300 text-xs">{new Date(item.date).toLocaleDateString('en-GB')}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Recent Events */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-accent-yellow pb-2">{t('footer.recent_events')}</h3>
          <ul className="space-y-4 text-sm">
            {eventItems.map((event) => (
              <li key={event.id} className="flex gap-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-14 h-10 object-cover rounded group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="flex-1">
                  <Link
                    to={`/footer-event/${event.id}`}
                    className="font-semibold hover:text-accent-yellow transition-colors block mb-1"
                  >
                    {event.title}
                  </Link>
                  <span className="text-gray-300 text-xs">
                    {new Date(event.date).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info + Social Links */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-accent-yellow pb-2">{t('footer.contact_us')}</h3>
          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-2 text-gray-100 hover:text-white transition-colors"><FaPhoneAlt className="mt-1 text-accent-yellow" /> +91 - 0471 - 4010374</p>
            <p className="flex items-start gap-2 text-gray-100 hover:text-white transition-colors"><FaEnvelope className="mt-1 text-accent-yellow" /> info@smartcitytvm.in</p>
            <p className="flex items-start gap-2 text-gray-100">
              <FaMapMarkerAlt className="mt-1 text-accent-yellow flex-shrink-0" />
              <span>
                4th Floor, Felicity Square Building<br />
                Opp AG Office, Statue<br />
                Thiruvananthapuram<br />
                <strong className="text-white">Pincode: 695001</strong>
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-semibold text-lg">{t('footer.follow_us')}</p>
            <div className="flex gap-3 text-white text-xl">
              <a href="https://www.facebook.com/smarttrivandrum/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:text-accent-yellow">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/company/smart-city-thiruvananthapuram-limited/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:text-accent-yellow">
                <FaLinkedinIn />
              </a>
              <a href="https://x.com/smarttrivandrum/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:text-accent-yellow">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/smarttrivandrum/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:text-accent-yellow">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@smartcitythiruvananthapura7226/videos" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:text-accent-yellow">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300" data-aos="fade-in">
        <p className="mb-2 md:mb-0">{t('footer.copyright')}</p>
        <div className="flex gap-6">
          <a href="/terms" className="hover:text-accent-yellow transition-colors font-medium">{t('footer.terms')}</a>
          <a href="/privacy" className="hover:text-accent-yellow transition-colors font-medium">{t('footer.privacy')}</a>
          <a href="/disclaimer" className="hover:text-accent-yellow transition-colors font-medium">{t('footer.disclaimer')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;