import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';
import Banner from '../../assets/banners/fundBanner.png';
import FundUtilization from '../../assets/images/fundUtilization.jpg';
import FundSource from '../../assets/images/fund_source.jpg';

const ProjectFunds = () => {
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [fundsUtilized, setFundsUtilized] = useState(0);
  const [utilizationRate, setUtilizationRate] = useState(0);
  const hasAnimated = useRef(false);

  const targetValues = {
    totalAllocated: 182.61,
    fundsUtilized: 142.28,
    utilizationRate: 78
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function
      
      setTotalAllocated(targetValues.totalAllocated * easeOut);
      setFundsUtilized(targetValues.fundsUtilized * easeOut);
      setUtilizationRate(targetValues.utilizationRate * easeOut);
      
      if (currentStep < steps) {
        setTimeout(animate, stepDuration);
      } else {
        hasAnimated.current = true;
      }
    };
    
    animate();
  }, []);

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
            Project Funds
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Financial Management & Allocation</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Transparent tracking of project funding sources and utilization patterns across all Smart City initiatives
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1E6091]/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-[#1E6091]" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Funds Allocated</h3>
            </div>
            <div className="text-4xl font-bold text-[#184E77]">
              ₹{totalAllocated.toFixed(2)} Cr
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1E6091]/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#1E6091]" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Funds Utilized</h3>
            </div>
            <div className="text-4xl font-bold text-[#184E77]">
              ₹{fundsUtilized.toFixed(2)} Cr
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1E6091]/10 rounded-lg">
                <Percent className="w-5 h-5 text-[#1E6091]" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Utilization Rate</h3>
            </div>
            <div className="text-4xl font-bold text-[#184E77]">
              {utilizationRate.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Fund Utilization Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fund Utilization</h3>
              <p className="text-gray-600 text-sm">
                Visual representation of budget allocation versus actual expenditure across different project categories
              </p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src={FundUtilization} 
                alt="Fund Utilization" 
                className="w-full max-w-4xl rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Fund Source Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fund Sources</h3>
              <p className="text-gray-600 text-sm">
                Breakdown of funding sources for Smart City Thiruvananthapuram projects
              </p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src={FundSource} 
                alt="Fund Source" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFunds;