import React from 'react'
import MileStoneBanner from '../../assets/banners/milestoneBanner.jpg'
import MilestoneImage1 from '../../assets/images/milestoneImage1.jpg'
import MilestoneImage2 from '../../assets/images/milestoneImage2.jpg'
import MilestoneImage3 from '../../assets/images/milestoneImage3.jpg'
import MilestoneImage4 from '../../assets/images/milestoneImage4.jpg'
import MilestoneImage5 from '../../assets/images/milestoneImage5.jpg'

const ProjectMilestone = () => {
  // Using the provided color palette
  const colors = [
    '#D9ED92', '#B5E48C', '#99D98C', 
    '#76C893', '#52B69A', '#34A0A4',
    '#168AAD', '#1A759F', '#1E6091', '#18AE77'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 60, 80, 0.85), rgba(0, 128, 128, 0.6)), url(${MileStoneBanner})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-lg">
            Project Milestones
          </h1>
        </div>
      </div>

      {/* Milestones Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          {/* Milestone 1 */}
          <div 
            className="relative overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors[0] }}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 z-10">
              <span className="font-bold" style={{ color: colors[8] }}>Milestone 1</span>
            </div>
            <img 
              src={MilestoneImage1} 
              alt="Milestone 1" 
              className="w-full object-cover"
            />
          </div>

          {/* Milestone 2 */}
          <div 
            className="relative  overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors[1] }}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 z-10">
              <span className="font-bold" style={{ color: colors[8] }}>Milestone 2</span>
            </div>
            <img 
              src={MilestoneImage2} 
              alt="Milestone 2" 
              className="w-full  object-cover"
            />
          </div>

          {/* Milestone 3 */}
          <div 
            className="relative overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors[2] }}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 z-10">
              <span className="font-bold" style={{ color: colors[8] }}>Milestone 3</span>
            </div>
            <img 
              src={MilestoneImage3} 
              alt="Milestone 3" 
              className="w-full  object-cover"
            />
          </div>

          {/* Milestone 4 */}
          <div 
            className="relative overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors[3] }}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 z-10">
              <span className="font-bold" style={{ color: colors[8] }}>Milestone 4</span>
            </div>
            <img 
              src={MilestoneImage4} 
              alt="Milestone 4" 
              className="w-full  object-cover"
            />
          </div>

          {/* Milestone 5 */}
          <div 
            className="relative overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors[4] }}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 z-10">
              <span className="font-bold" style={{ color: colors[8] }}>Milestone 5</span>
            </div>
            <img 
              src={MilestoneImage5} 
              alt="Milestone 5" 
              className="w-full  object-cover"
            />
          </div>

          {/* Progress Summary Card */}
          <div 
            className="relative overflow-hidden shadow-xl p-6 flex flex-col justify-between"
            style={{ 
              backgroundColor: colors[5],
              gridColumn: '1 / -1',
              backgroundImage: `linear-gradient(135deg, ${colors[5]} 0%, ${colors[9]} 100%)`
            }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Project Progress Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((milestone) => (
                  <div 
                    key={milestone} 
                    className="bg-white bg-opacity-80  p-3 text-center"
                  >
                    <div className="text-lg font-bold" style={{ color: colors[7] }}>
                      Milestone {milestone}
                    </div>
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 overflow-hidden">
                        <div 
                          className="h-full"
                          style={{ 
                            width: `${milestone * 20}%`,
                            backgroundColor: colors[8]
                          }}
                        ></div>
                      </div>
                      <div className="text-sm mt-1" style={{ color: colors[7] }}>
                        {milestone === 5 ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectMilestone