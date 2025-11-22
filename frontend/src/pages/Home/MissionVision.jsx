import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

import VisionBannerSection from '../../components/vision/VisionBannerSection';
import VisionSection from '../../components/vision/VisionSection';
import Connectivity from '../../components/vision/Connectivity';
import Evolution from '../../components/vision/Evolution';
import DemographySection from '../../components/vision/DemographySection';
import LandUsePatternSection from '../../components/vision/LandUsePatternSection';
import PlanningAndDevelopmentSection from '../../components/vision/PlanningAndDevelopmentSection';

const MissionVision = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <div className="font-sans bg-gray-50">
      <VisionBannerSection t={t} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold text-center mb-6">
            {t('missionVision.heading')}
          </h2>
          <VisionSection t={t} />
        </div>
        <div data-aos="fade-up"><Connectivity t={t} /></div>
        <div data-aos="fade-up"><Evolution t={t} /></div>
        <div data-aos="fade-up"><DemographySection t={t} /></div>
        <div data-aos="fade-up"><LandUsePatternSection t={t} /></div>
        <div data-aos="fade-up"><PlanningAndDevelopmentSection t={t} /></div>
      </div>
    </div>
  );
};

export default MissionVision;
