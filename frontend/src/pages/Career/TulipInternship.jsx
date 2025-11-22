import React from 'react';
import { GraduationCap, Users, Award, CheckCircle } from 'lucide-react';
import Banner from '../../assets/banners/tulipintershipBanner.jpg';
import Poster from '../../assets/images/tulipPoster.jpg';
import InternSoorya from '../../assets/images/TulipInternship/Soorya.png';
import InternSanjana from '../../assets/images/TulipInternship/Sanjana-P.png';
import InternNeethu from '../../assets/images/TulipInternship/Neethu-S.png';
import InternAdarsh from '../../assets/images/TulipInternship/Adarsh.png';
import InternAnjusha from '../../assets/images/TulipInternship/internAnjusha.jpg';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TulipInternship = () => {

  const interns = [
    {
      name: "Soorya Uthaman",
      image: InternSoorya,
      quote:
        "In my position as an intern (Civil Engineering) each day is an opportunity to learn and observe various processes",
      field: "Civil, GIS department",
    },
    {
      name: "Adarsh",
      image: InternAdarsh,
      quote:
        "This internship is a great platform for me to apply my academic knowledge in real-world scenarios, enhancing my skills in programming, problem-solving, and teamwork.",
      field: "Computer Science",
    },
    {
      name: "Sanjana P",
      image: InternSanjana,
      quote:
        "This internship has provided me with invaluable hands-on experience in Civil Engineering (Geo Informatics) projects",
      field: "Civil Engineering",
    },
    {
      name: "Neethu S",
      image: InternNeethu,
      quote:
        "Working with the smart city team has given me practical insights into urban planning and development",
      field: "Civil Engineering",
    },
    {
      name: "Anjusha",
      image: InternAnjusha,
      quote:
        "In my position as an intern (Electrical Engineering) each day is an opportunity to learn and observe various processes",
      field: "Electrical Engineering",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="tulip-internship-page">
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
            Tulip Internships
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tulip Internship Program</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Empowering the next generation through hands-on experience in smart city development
          </p>
        </div>

        {/* Event Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Internship Event Launch Ceremony</h3>
            </div>
            {/* Video Section */}
            <div className="w-full max-w-4xl mx-auto mb-6">
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/h50Ebi0WRrQ"
                  title="Tulip Internship Launch Ceremony"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
            {/* Poster Section */}
            <div className="bg-gray-50 p-6 max-w-2xl mx-auto rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-center text-[#1E6091]">Event Poster</h4>
              <img
                src={Poster}
                alt="Tulip Internship Launch Event Poster"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Intern Testimonials */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-[#1E6091]" />
                <h3 className="text-xl font-bold text-gray-900">Meet Our Talented Interns</h3>
              </div>
            </div>
            <Slider {...sliderSettings}>
              {interns.map((intern, index) => (
                <div key={index} className="px-2">
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-5 h-[400px] flex flex-col">
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={intern.image}
                          alt={intern.name}
                          className="w-32 h-32 object-cover rounded-full shadow-sm"
                        />
                        <div className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center text-white bg-[#1E6091] rounded-full text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-grow flex flex-col">
                      <h4 className="text-lg font-bold text-center mb-2 text-[#1E6091]">
                        {intern.name}
                      </h4>
                      <p className="text-gray-700 text-center italic flex-grow text-sm">"{intern.quote}"</p>
                      <div className="mt-4 text-center">
                        <div className="inline-block px-3 py-1 text-xs font-medium bg-[#1E6091]/10 text-[#1E6091] rounded">
                          {intern.field}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Program Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#1E6091]" />
                <h3 className="text-xl font-bold text-gray-900">About the Tulip Internship Program</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-[#1E6091]">Program Highlights</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Hands-on experience in smart city projects</li>
                  <li>Mentorship from industry experts</li>
                  <li>Exposure to cutting-edge urban technologies</li>
                  <li>Networking opportunities with government officials</li>
                  <li>Stipend and certification upon completion</li>
                </ul>
                <h4 className="text-lg font-semibold mt-6 mb-3 text-[#1E6091]">Eligibility</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Currently enrolled in engineering or urban planning programs</li>
                  <li>Minimum GPA of 7.0</li>
                  <li>Strong interest in smart city development</li>
                  <li>Duration: 2-6 months</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-[#1E6091]">Application Process</h4>
                <div className="space-y-4">
                  {[
                    { step: 1, text: "Submit online application form" },
                    { step: 2, text: "Screening of applications" },
                    { step: 3, text: "Technical interview" },
                    { step: 4, text: "Final selection and onboarding" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white mr-3 mt-1 bg-[#1E6091] rounded-full text-sm font-bold">
                        {item.step}
                      </div>
                      <p className="text-gray-700 text-sm">{item.text}</p>
                    </div>
                  ))}
                  <div className="mt-8 text-center">
                    <a
                      href="https://internship.aicte-india.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="py-3 px-8 bg-[#1E6091] hover:bg-[#184E77] text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        Apply Now for Next Batch
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Highlights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 md:p-8 text-center">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Why Our Interns Love the Program</h3>
            </div>
            <div className="max-w-3xl mx-auto text-gray-700 italic text-base bg-gray-50 p-6 rounded-lg">
              "The Tulip Internship provided me with real-world experience that bridged the gap between academic learning and professional practice. The mentorship I received was invaluable to my career development."
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              - Previous Intern, now Project Engineer at Smart City TVM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TulipInternship;