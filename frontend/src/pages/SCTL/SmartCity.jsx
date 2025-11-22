import React from 'react';
import { Building2, Users, DollarSign, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Banner from '../../assets/banners/cityBanner.jpg';

const SmartCity = () => {
  const links = [
    {
      to: '/spv',
      title: 'Special Purpose Vehicle',
      description: 'Learn about our organizational structure',
      icon: Building2,
      color: 'bg-[#1E6091]'
    },
    {
      to: '/pmc_consultant',
      title: 'Consultant',
      description: 'View our consulting partners',
      icon: Users,
      color: 'bg-[#184E77]'
    },
    {
      to: '/funds',
      title: 'Project Funds',
      description: 'Explore funding details',
      icon: DollarSign,
      color: 'bg-[#1E6091]'
    },
    {
      to: '/financials',
      title: 'Financials',
      description: 'Review financial reports',
      icon: FileText,
      color: 'bg-[#184E77]'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner || ''})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            Transforming Thiruvananthapuram
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-6 h-6 text-[#1E6091]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Smart City Thiruvananthapuram</h2>
          </div>
          <p className="text-gray-600 mt-2">
            Explore our organizational structure, partnerships, and financial information
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.to}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${link.color} p-3 rounded-lg text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#1E6091] transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                    <div className="flex items-center text-[#1E6091] font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartCity;