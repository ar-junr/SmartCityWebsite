import React, { useState, useEffect } from 'react';
import { CheckCircle2, DollarSign, Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import Banner from '../../assets/banners/completeProjectBanner.png';

const CompletedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'gallery'

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.COMPLETED_PROJECTS))
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching completed projects:", err);
        setLoading(false);
      });
  }, []);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const totalInvestment = projects.reduce((sum, project) => {
  const amount = parseFloat(project.amount);
  return sum + (isNaN(amount) ? 0 : amount);
}, 0).toFixed(2);


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
          <div className="text-center px-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Completed Projects
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Celebrating our successful urban transformation initiatives
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#1E6091]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Achievements</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#1E6091] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-[#1E6091] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Gallery View
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            These successfully completed projects demonstrate our commitment to building a smarter, more sustainable Thiruvananthapuram
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Completed Projects List</h3>
                  <span className="text-sm text-gray-500">{projects.filter(p => p.project_name).length} projects</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1E6091] text-white">
                        <th className="p-4 text-left font-semibold text-sm">No</th>
                        <th className="p-4 text-left font-semibold text-sm">Project Name</th>
                        <th className="p-4 text-right font-semibold text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Amount (₹ Cr)</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.filter(project => project.project_name).length > 0 ? (
                        projects
                          .filter(project => project.project_name)
                          .map((project, index) => (
                            <tr
                              key={project.id}
                              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }`}
                            >
                              <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                              <td className="p-4 text-gray-900">{project.project_name}</td>
                              <td className="p-4 text-right text-gray-700 font-medium">₹{project.amount} Cr</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="p-8 text-center text-gray-500">
                            No completed projects found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Gallery View */}
            {viewMode === 'gallery' && projects.some(p => p.images && p.images.length > 0) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-[#1E6091]" />
                    <h3 className="text-xl font-bold text-gray-900">Project Highlights</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Click images to view full size</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.flatMap(project =>
                    project.images?.map((img) => (
                      <div
                        key={img.id}
                        className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        onClick={() => openLightbox(img)}
                      >
                        <img
                          src={img.image}
                          alt={img.caption || 'Project Image'}
                          className="w-full h-64 object-cover"
                        />
                        {img.caption && (
                          <div className="p-3 bg-gray-50">
                            <p className="text-sm text-gray-700 font-medium">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Transformation in Numbers</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#1E6091] mb-2">
                    {projects.filter(p => p.project_name).length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#1E6091] mb-2">
                    ₹{totalInvestment} Cr
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Total Investment</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#1E6091] mb-2">24+</div>
                  <div className="text-sm text-gray-600 font-medium">Locations Transformed</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={currentImage.image}
              alt={currentImage.caption || 'Full View'}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            {currentImage.caption && (
              <p className="text-white text-center mt-4">{currentImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedProject;
