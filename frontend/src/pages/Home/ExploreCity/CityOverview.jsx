import React from 'react';
import SCPMap from '../../../assets/images/map2.jpg';

const SmartCityTable = () => {
  const data = [
    {
      module: 'Urban Basic Services',
      projects: '15 Projects : ₹771.5Cr',
      strategy: 'Improving Basic Services',
      color: '#1E6091'
    },
    {
      module: 'Land Use Efficiency',
      projects: '5 Projects : ₹238Cr',
      strategy: 'Re-Densification with creative land use',
      color: '#1E6091'
    },
    {
      module: 'Cultural Identity & Heritage',
      projects: '9 Projects : ₹126.5Cr',
      strategy: 'Conserving Historical & Cultural assets',
      color: '#1E6091'
    },
    {
      module: 'Resilience & Eco-friendliness',
      projects: '3 Projects : ₹143.7Cr',
      strategy: 'Sustainable Built & natural landscape',
      color: '#1E6091'
    },
    {
      module: 'Socio-economic Inclusiveness',
      projects: '3 Projects : ₹106.4Cr',
      strategy: 'Promote diversity & Foster inclusiveness',
      color: '#1E6091'
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#184E77]">
          Thiruvananthapuram Smart City & ABD Area
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Map Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative border border-gray-200">
              <img
                src={SCPMap}
                alt="Smart City ABD Map"
                className="w-full"
              />
              <div className="bg-[#184E77] text-white p-3">
                <p className="text-center font-medium">Smart City Area Development Plan</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full lg:w-1/2">
            <div className="border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#184E77] text-white">
                    <th className="py-4 px-4 text-left font-bold">SCP Modules</th>
                    <th className="py-4 px-4 text-left font-bold">Projects & Cost</th>
                    <th className="py-4 px-4 text-left font-bold">Proposed Strategies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr 
                      key={index} 
                      className="bg-white hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 mr-3 bg-[#1E6091]"
                          ></div>
                          {row.module}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#1E6091]">
                        {row.projects}
                      </td>
                      <td className="py-4 px-4">
                        {row.strategy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Legend */}
            <div className="mt-6 bg-white p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#184E77] mb-3">Project Module Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 bg-[#1E6091]"
                    ></div>
                    <span className="text-sm text-gray-700">{item.module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#184E77] mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-[#1E6091]">35+</p>
            <p className="mt-2 text-gray-700">Across all development modules</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#184E77] mb-2">Total Investment</h3>
            <p className="text-3xl font-bold text-[#1E6091]">₹1,386 Cr</p>
            <p className="mt-2 text-gray-700">Committed for city development</p>
          </div>
          
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#184E77] mb-2">Development Area</h3>
            <p className="text-3xl font-bold text-[#1E6091]">15.7 km²</p>
            <p className="mt-2 text-gray-700">Covered under ABD program</p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-white p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resilience & Eco-friendliness */}
            <div className="p-6 bg-gray-50 border-l-4 border-[#1E6091]">
              <h3 className="text-xl font-bold text-[#184E77] mb-4">Resilience & Eco-friendliness</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 border border-gray-200">
                  <p className="font-semibold text-[#1E6091]">3 Projects</p>
                  <p className="text-lg font-bold">₹143.7Cr</p>
                </div>
                <p className="text-gray-700">Sustainable Built & natural landscape</p>
              </div>
            </div>
            
            {/* Socio-economic inclusiveness */}
            <div className="p-6 bg-gray-50 border-l-4 border-[#1E6091]">
              <h3 className="text-xl font-bold text-[#184E77] mb-4">Socio-economic inclusiveness</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 border border-gray-200">
                  <p className="font-semibold text-[#1E6091]">3 Projects</p>
                  <p className="text-lg font-bold">₹106.4Cr</p>
                </div>
                <p className="text-gray-700">Promote diversity & Foster inclusiveness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
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

export default SmartCityTable;