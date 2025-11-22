import React from 'react';
import BulletPoint from '../../../assets/images/bullet.png'
const CityHighlight = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-4">
            What makes Thiruvananthapuram Unique?
          </h1>
          <div className="h-0.5 w-24 bg-[#1E6091] mx-auto"></div>
        </div>

        {/* SWOT Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Strength */}
          <div className="bg-white border border-gray-200">
            <div className="bg-[#184E77] p-4">
              <h2 className="text-xl font-bold text-white">Strength</h2>
            </div>
            <ul className="p-6 space-y-4">
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Major IT Hub in India</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Highly literate and skilled workforce</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Ranked as city providing best quality of life</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Ranked as best governed city in India</span>
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-white border border-gray-200">
            <div className="bg-[#1E6091] p-4">
              <h2 className="text-xl font-bold text-white">Opportunities</h2>
            </div>
            <ul className="p-6 space-y-4">
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Prospects for strengthening of tourism economy</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Upcoming metro rail projects and transhipment terminal</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Electronic manufacturing based economic development</span>
              </li>
            </ul>
          </div>

          {/* Weakness */}
          <div className="bg-white border border-gray-200">
            <div className="bg-[#184E77] p-4">
              <h2 className="text-xl font-bold text-white">Weakness</h2>
            </div>
            <ul className="p-6 space-y-4">
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Deficient Sewerage Infrastructure</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Lack of end to end waste management system</span>
              </li>
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-white border border-gray-200">
            <div className="bg-[#1E6091] p-4">
              <h2 className="text-xl font-bold text-white">Threats</h2>
            </div>
            <ul className="p-6 space-y-4">
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Economic devaluation due to flooding and water logging in city core area</span>
              </li>
              <li className="flex items-start">
                <div className="">
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Environmental degradation</span>
              </li>
              <li className="flex items-start">
                <div>
                  <img className='w-8 h-8' src={BulletPoint} alt="" />
                </div>
                <span className="text-gray-700">Motorized-vehicle oriented Urban Transport</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Awards Section */}
        <div className="bg-white border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-[#184E77] mb-8">
            Awards and Recognition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 ">
              <p className="text-gray-700">
                Selected as 'Best governed city in India' in 2017 by Janaagraha Center for Citizenship & Democracy
              </p>
            </div>
            
            <div className="bg-gray-100 p-6">
              <p className="text-gray-700">
                Selected as 'Best city' of India under Housing & Transport category in 2013 by India Today
              </p>
            </div>
            
            <div className="bg-gray-100 p-6">
              <p className="text-gray-700">
                Listed among top 10 cities in India on Vibrancy and Consumption Index by Morgan Stanley
              </p>
            </div>
            
            <div className="bg-gray-100 p-6">
              <p className="text-gray-700">
                Rated as the 'best 2nd tier metro' with IT/ITeS infrastructure & second in terms of availability of human talent
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <a 
            href="/city-profile" 
            className="inline-flex items-center px-6 py-3 bg-[#184E77] text-white hover:bg-[#1E6091] transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to City Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default CityHighlight;