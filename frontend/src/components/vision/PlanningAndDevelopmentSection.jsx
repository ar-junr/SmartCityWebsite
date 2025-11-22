import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const PlanningAndDevelopmentSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const strategies = t('planning.strategies', { returnObjects: true });

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#184E77]" data-aos="fade-up">
          {t('planning.heading')}
        </h1>
        <div className="space-y-2">
          {strategies.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 shadow-sm rounded-md overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  className={`w-full text-left px-6 py-5 flex justify-between items-center transition duration-200 ${
                    isOpen ? 'bg-[#1E6091] text-white' : 'bg-white hover:bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-semibold text-lg">{item.title}</span>
                  {isOpen ? (
                    <MdKeyboardArrowUp className="text-2xl transition-transform duration-200" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="text-2xl transition-transform duration-200" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 text-gray-700" data-aos="fade-in">
                    <p className="mb-4 text-gray-600">{item.description}</p>
                    <ul className="list-disc list-inside space-y-2">
                      {item.goals.map((goal, i) => (
                        <li key={i} className="ml-4">{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanningAndDevelopmentSection;
