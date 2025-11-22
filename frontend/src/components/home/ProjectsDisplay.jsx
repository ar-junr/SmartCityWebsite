import React, { useState } from 'react';
const ProjectsDisplay = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projectTypes = [
    {
      id: 'abd',
      title: 'ABD Projects',
      description: 'Area-Based Development projects focusing on transforming specific zones within the city',
      projects: [
        { name: 'Chalai Redevelopment', status: 'Ongoing', progress: 65 },
        { name: 'East Fort Pedestrian Plaza', status: 'Completed', progress: 100 },
        { name: 'Kowdiar Smart Roads', status: 'Ongoing', progress: 45 },
        { name: 'Technopark Phase 4 Expansion', status: 'Planning', progress: 15 },
      ]
    },
    {
      id: 'pancity',
      title: 'Pancity Projects',
      description: 'City-wide initiatives benefiting all residents through technology and infrastructure improvements',
      projects: [
        { name: 'Smart Water Management System', status: 'Ongoing', progress: 80 },
        { name: 'City-Wide Wi-Fi Network', status: 'Completed', progress: 100 },
        { name: 'Intelligent Traffic Management', status: 'Ongoing', progress: 55 },
        { name: 'E-Governance Portal', status: 'Planning', progress: 20 },
      ]
    },
    {
      id: 'convergence',
      title: 'Convergence Projects',
      description: 'Collaborative initiatives integrating multiple departments and agencies for holistic development',
      projects: [
        { name: 'Integrated Command & Control Center', status: 'Completed', progress: 100 },
        { name: 'Waste-to-Energy Plant', status: 'Ongoing', progress: 70 },
        { name: 'Green Mobility Corridor', status: 'Ongoing', progress: 40 },
        { name: 'Digital Literacy Centers', status: 'Planning', progress: 10 },
      ]
    }
  ];

  const toggleProject = (id) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a3a5f] mb-4">Major Projects</h1>
          <p className="text-lg md:text-xl text-[#4a6b8f] max-w-3xl mx-auto">
            Transforming Thiruvananthapuram through innovative urban development initiatives
          </p>
        </div>
        
        <div className="space-y-4">
          {projectTypes.map((type) => (
            <div 
              key={type.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                activeProject === type.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <button
                onClick={() => toggleProject(type.id)}
                className="w-full flex justify-between items-start p-4 md:p-6 text-left focus:outline-none"
              >
                <div className="flex flex-col md:flex-row md:items-center w-full gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="bg-blue-500 w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {type.title.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="text-lg md:text-xl font-bold text-[#1a3a5f]">{type.title}</h3>
                      <p className="text-gray-600 mt-1 text-sm md:text-base">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="ml-auto flex-shrink-0">
                    
                  </div>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  activeProject === type.id ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
                    {type.projects.map((project, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <h4 className="font-bold text-base md:text-lg text-gray-800">{project.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium self-start ${
                            project.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : project.status === 'Ongoing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs md:text-sm font-medium text-gray-600">Progress</span>
                            <span className="text-xs md:text-sm font-medium text-gray-600">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                project.status === 'Completed' 
                                  ? 'bg-green-500' 
                                  : project.status === 'Ongoing'
                                  ? 'bg-blue-500'
                                  : 'bg-yellow-500'
                              }`} 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <button className="mt-3 text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium flex items-center">
                          View details
                          
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 md:p-6 bg-blue-50 border-t border-blue-100">
                    <button className="text-blue-700 font-medium hover:text-blue-900 flex items-center justify-center md:mx-auto text-sm md:text-base">
                      View all {type.title}
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDisplay;