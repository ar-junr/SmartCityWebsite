import React from 'react';
import Banner from '../../assets/banners/fundBanner.png';
import FundUtilization from '../../assets/images/fundUtilization.jpg';
import FundSource from '../../assets/images/fund_source.jpg';
const ProjectFunds = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center object-cover"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 60, 80, 0.85), rgba(0, 128, 128, 0.6)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg">
            Project Funds
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Financial Management & Allocation
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Transparent tracking of project funding sources and utilization patterns across all 
            Smart City initiatives in Thiruvananthapuram
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col items-center">
            <div className="text-5xl font-bold text-[#184E77]">₹182.61 Cr</div>
            <div className="text-lg text-gray-600 mt-2">Total Funds Allocated</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col items-center">
            <div className="text-5xl font-bold text-[#184E77]">₹142.28 Cr</div>
            <div className="text-lg text-gray-600 mt-2">Funds Utilized</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col items-center">
            <div className="text-5xl font-bold text-[#184E77]">78%</div>
            <div className="text-lg text-gray-600 mt-2">Utilization Rate</div>
          </div>
        </div>

        {/* Fund Utilization Section */}
        <div className=" overflow-hidden mb-16">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Fund Utilization
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Visual representation of budget allocation versus actual expenditure across 
                  different project categories
                </p>
              </div>
            </div>
            
            <div className=" p-4 md:p-6 flex justify-center">
              <img 
                src={FundUtilization} 
                alt="Fund Utilization" 
                className="w-full max-w-4xl"
              />
            </div>
          </div>
        </div>

        {/* Fund Source Section */}
        <div className="overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Fund Sources
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Breakdown of funding sources for Smart City Thiruvananthapuram projects
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full p-4 flex justify-center">
                <img 
                  src={FundSource} 
                  alt="Fund Source" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFunds;