import React, { useState } from 'react';
import BoardOfDirectors from './specialPurpose/BoardOfDirectors';
import CEOs from './specialPurpose/CEOs';
import Staffs from './specialPurpose/Staffs';
import Banner from '../../assets/banners/spvBanner.png';
import AdvisoryForm from './spv/1-Advisory-Forum-001-1-converted.pdf';
import SPVCreation from './spv/creation_of_spv.pdf';

const SpecialPurposeVehicle = () => {
  const [activeTab, setActiveTab] = useState('board');

  const tabs = [
    { id: 'board', label: 'Board of Directors' },
    { id: 'ceos', label: 'CEOs' },
    { id: 'staff', label: 'Staff' },
  ];

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
            Special Purpose Vehicle
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PDF Links */}
        <div className="flex flex-wrap justify-end gap-3 mb-6">
          <a
            href={AdvisoryForm}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1E6091] text-white hover:bg-[#184E77] transition duration-200 font-medium rounded-lg shadow-sm hover:shadow-md"
          >
            Advisory Forum PDF
          </a>
          <a
            href={SPVCreation}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1E6091] text-white hover:bg-[#184E77] transition duration-200 font-medium rounded-lg shadow-sm hover:shadow-md"
          >
            SPV Creation PDF
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium text-sm transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-[#1E6091] border-b-2 border-[#1E6091] bg-[#1E6091]/5'
                    : 'text-gray-600 hover:text-[#1E6091] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'board' && <BoardOfDirectors />}
          {activeTab === 'ceos' && <CEOs />}
          {activeTab === 'staff' && <Staffs />}
        </div>
      </div>
    </div>
  );
};

export default SpecialPurposeVehicle;
