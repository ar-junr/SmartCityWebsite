// Updated SCTLProject component with i18n support (English & Malayalam)
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

import Image1 from '../../assets/images/SCTL Projects/manaveeyamImg1.png';
import Image2 from '../../assets/images/SCTL Projects/mlcpImg2.jpg';
import Image3 from '../../assets/images/SCTL Projects/Open-Air_AuditoriumImg3.png';
import Image4 from '../../assets/images/SCTL Projects/Biomining_of_Wastes_at_Chalaiimg4.png';
import Image5 from '../../assets/images/SCTL Projects/img5.jpg';
import Image6 from '../../assets/images/SCTL Projects/KSRTCImg6.jpg';
import Image7 from '../../assets/images/SCTL Projects/KRFB2img7.png';
import Image8 from '../../assets/images/SCTL Projects/KRFB1Img8.png';
import Image9 from '../../assets/images/SCTL Projects/ANERTImg9.jpg';

const SCTLProject = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const { t } = useTranslation();

  const projects = [
    {
      title: t('sctlProjects.projects.0.title'),
      image: Image1,
      content: t('sctlProjects.projects.0.content'),
      stats: t('sctlProjects.projects.0.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.1.title'),
      image: Image2,
      content: t('sctlProjects.projects.1.content'),
      stats: t('sctlProjects.projects.1.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.2.title'),
      image: Image3,
      content: t('sctlProjects.projects.2.content'),
      stats: t('sctlProjects.projects.2.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.3.title'),
      image: Image4,
      content: t('sctlProjects.projects.3.content'),
      stats: t('sctlProjects.projects.3.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.4.title'),
      image: Image5,
      content: t('sctlProjects.projects.4.content'),
      stats: t('sctlProjects.projects.4.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.5.title'),
      image: Image6,
      content: t('sctlProjects.projects.5.content'),
      stats: t('sctlProjects.projects.5.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.6.title'),
      images: [Image7, Image8],
      content: t('sctlProjects.projects.6.content'),
      stats: t('sctlProjects.projects.6.stats', { returnObjects: true })
    },
    {
      title: t('sctlProjects.projects.7.title'),
      image: Image9,
      content: t('sctlProjects.projects.7.content'),
      stats: t('sctlProjects.projects.7.stats', { returnObjects: true })
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="relative bg-[#184E77] text-white py-24 px-4 overflow-hidden" data-aos="fade-in">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('sctlProjects.hero.title1')} <span className="text-[#76C893]">{t('sctlProjects.hero.title2')}</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
              {t('sctlProjects.hero.subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#184E77] to-[#0d3b61] z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1E6091] to-transparent z-0"></div>
      </div>

      <div className="py-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`py-16 ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-50 to-white' : 'bg-white'}`}
            data-aos="fade-up"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                <div className="w-full lg:w-1/2" data-aos="zoom-in">
                  {project.images ? (
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="overflow-hidden h-72">
                          <img
                            src={img}
                            alt={`${project.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-hidden h-80">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-1/2" data-aos="fade-left">
                  <div className="relative">
                    <span className="text-8xl font-bold text-blue-50 absolute -top-8 -left-2 opacity-50 z-0">
                      {index + 1}
                    </span>
                    <div className="relative z-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="bg-blue-50 text-[#184E77] px-3 py-2 border border-blue-100">
                            <span className="font-semibold">{stat.label}:</span> {stat.value}
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-8">
                        {project.content}
                      </p>
                      <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-green-700 font-medium">{t('sctlProjects.status.completed')}</span>
                        </div>
                        <div className="text-[#184E77] font-medium">
                          {t('sctlProjects.status.initiative')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-24 bg-gradient-to-br from-[#184E77] to-[#0d3b61] text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('sctlProjects.impact.title')}</h2>
            <p className="text-blue-200 max-w-3xl mx-auto">
              {t('sctlProjects.impact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t('sctlProjects.impact.items', { returnObjects: true }).map((item, index) => (
              <div key={index} className="bg-[#1E6091]/50 p-8 backdrop-blur-sm border border-[#34A0A4]/30 rounded-lg" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCTLProject;
