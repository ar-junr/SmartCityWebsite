import React from 'react';
import PDF from './PDFFolder/SCTL.pdf';
import PDFIcon from '../../assets/images/pdfFile.png';

const ProjectPage = () => {
  // Completed projects data
  const completedProjects = [
    "Installation of Drinking Water Kiosks",
    "Multi-Level Car Parking at A Block, Palayam (Phase 1)",
    "Manaveeyam Veedhi (Cultural Street)",
    "Urban Street Haat at Charithra Veedhi incl. Sree Chitra Park",
    "Biomining of Legacy Wastes at Palayam",
    "Procurement of 15 e-rickshaws & 15 e-autos",
    "Smart Mosquito Density System",
    "Parking at Thampanoor",
    "Vending Zone at RKV Road",
  ];

  // Ongoing projects data
  const ongoingProjects = [
    { project: "Warehousing at Chalai", amount: "18.66", target: "30-07-2024" },
    { project: "Social Housing at Rajaji Nagar (Phase 1)", amount: "8.00", target: "30-11-2024" },
    { project: "Smart Roads (Corporation)", amount: "40.00", target: "30-07-2024" },
    { project: "Palayam Market Redevelopment", amount: "28.54", target: "30-03-2025" },
    { project: "Smart Roads – KRFB Phase 2", amount: "125.48", target: "30-07-2024" },
    { project: "Asset Mapping & Tax Digitization", amount: "7.80", target: "30-07-2024" },
    { project: "Tensile Roof at Central Plaza, East Fort", amount: "2.90", target: "30-07-2024" },
    { project: "Solid Waste Management (Decentralized)", amount: "4.49", target: "30-07-2024" },
    { project: "E-Vehicles & Chargers", amount: "23.90", target: "--" },
    { project: "E-health Solutions", amount: "3.00", target: "30-07-2024" },
    { project: "Smart Roads – Corporation Phase 4", amount: "40.62", target: "30-07-2024" },
    { project: "MLCP at Various Locations", amount: "35.00", target: "30-12-2024" },
    { project: "Junction Improvement & Access", amount: "--", target: "--" },
    { project: "Rooftop Solar – Phase 7", amount: "45.84", target: "30-07-2024" },
  ];

  return (
    <div className="bg-gradient-light min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-8 px-4 shadow-large">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Smart City Thiruvananthapuram Limited</h1>
              <p className="text-gray-200 text-lg">Project Progress Report</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                Date: 30.07.2024
              </span>
              <a 
                href={PDF} 
                download="SCTL-Project-Report.pdf"
                className="flex items-center gap-2 bg-white text-primary-600 px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                <img src={PDFIcon} alt="PDF Icon" className="w-5 h-5" />
                <span>Download Full Report</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-large p-8 mb-8 border-l-4 border-primary-500 card-hover" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-6 flex items-center">
            <span className="bg-gradient-primary text-white w-10 h-10 flex items-center justify-center rounded-lg mr-4 text-xl font-bold">i</span>
            Project Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-gray-600 mb-2 font-medium">Total Project Outlay</p>
              <p className="text-3xl font-bold gradient-text">₹1242.48 Cr</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-gray-600 mb-3 font-medium">Funding Sources</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">Central Funds:</span>
                  <span className="font-bold text-primary-600">₹488 Cr</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">State Funds:</span>
                  <span className="font-bold text-primary-600">₹488 Cr</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">ULB & Convergence:</span>
                  <span className="font-bold text-primary-600">₹266.48 Cr</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-soft hover:shadow-medium transition-all duration-300">
              <p className="text-gray-600">Project Status</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Total Projects:</span>
                  <span className="font-medium">79</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-medium text-gray-700">64</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongoing:</span>
                  <span className="font-medium text-gray-700">15</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
            <p className="text-gray-700">
              <span className="font-bold">Focus Area:</span> ABD area (9 wards within 4 km of Secretariat)
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-bold">Incorporated:</span> 13th August 2017
            </p>
          </div>
        </div>

        {/* Completed Projects Section */}
        <div className="bg-white shadow-sm p-6 mb-8 border-l-4 border-gray-400">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <span className="bg-gray-700 text-white w-8 h-8 flex items-center justify-center mr-3">✓</span>
              Completed Projects (55 projects, ₹538.20 Cr)
            </h2>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium">
              SCTL Individual Projects
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedProjects.map((project, index) => (
              <div 
                key={index} 
                className="flex items-start p-3 border border-gray-200 bg-gray-50"
              >
                <span className="text-gray-700 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{project}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-[#1E6091] text-white w-6 h-6 flex items-center justify-center mr-2 text-sm">+</span>
              Convergence Projects (9 projects, ₹271.53 Cr)
            </h3>
            <p className="text-gray-600 italic">
              Convergence projects successfully completed as part of the Smart City initiative
            </p>
          </div>
        </div>

        {/* Ongoing Projects Section */}
        <div className="bg-white shadow-sm p-6 border-l-4 border-[#1E6091]">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <span className="bg-[#1E6091] text-white w-8 h-8 flex items-center justify-center mr-3">↻</span>
              Ongoing Projects (14 projects, ₹399.83 Cr)
            </h2>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium">
              SCTL Individual Projects
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-[#184E77] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Project</th>
                  <th className="px-4 py-3 text-right">Amount (₹ Cr)</th>
                  <th className="px-4 py-3 text-center">Completion Target</th>
                </tr>
              </thead>
              <tbody>
                {ongoingProjects.map((project, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3 border-b border-gray-200 font-medium">{index + 1}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{project.project}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-right font-medium">
                      {project.amount !== "--" ? `₹${project.amount}` : "--"}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-center">
                      <span className={`px-2 py-1 text-xs ${
                        project.target === "--" 
                          ? "bg-gray-100 text-gray-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {project.target}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#1E6091] text-white">
                <tr>
                  <td className="px-4 py-3 font-bold" colSpan="2">Total Ongoing Projects</td>
                  <td className="px-4 py-3 text-right font-bold">₹399.83 Cr</td>
                  <td className="px-4 py-3 text-center">14 projects</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-[#1E6091] text-white w-6 h-6 flex items-center justify-center mr-2 text-sm">+</span>
              Convergence Projects (1 project, ₹32.91 Cr)
            </h3>
            <p className="text-gray-600 italic">
              Ongoing convergence project contributing to the Smart City mission
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mt-8 bg-gray-50 p-6 border-l-4 border-[#184E77]">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-[#1E6091] text-white w-8 h-8 flex items-center justify-center mr-3">★</span>
            Key Highlights
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
            <li>Focus on Area-Based Development (ABD) in 9 key wards</li>
            <li>Significant progress in infrastructure, sustainability, and smart solutions</li>
            <li>Integration of technology for urban management and citizen services</li>
            <li>Focus on sustainable transportation with electric vehicles</li>
            <li>Solar energy initiatives for renewable power generation</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#184E77] text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">Smart City Thiruvananthapuram Limited</p>
          <p className="text-gray-300 text-sm">Incorporated on 13th August 2017 | Progress Report as of 30.07.2024</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;