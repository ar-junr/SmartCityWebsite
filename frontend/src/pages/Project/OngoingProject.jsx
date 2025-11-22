import React, { useEffect, useState } from 'react';
import { Building2, Calendar, DollarSign, Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import dayjs from 'dayjs';
import Banner from '../../assets/banners/ongoingProjectBanner.png';

const OngoingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'gallery'

  const fetchProjects = async (url = null, replace = false) => {
    try {
      setLoading(true);
      const apiUrl = url || API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ONGOING_PROJECTS);
      const res = await axios.get(apiUrl);
      const results = res.data.results || res.data;
      setProjects((prev) => replace ? results : [...prev, ...results]);
      setNextUrl(res.data.next);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(null, true);
  }, []);


  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

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
            Ongoing Projects
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#1E6091]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ongoing Projects</h2>
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
            Track the progress of active Smart City projects in Thiruvananthapuram
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1E6091] text-white">
                        <th className="p-4 text-left font-semibold text-sm">No</th>
                        <th className="p-4 text-left font-semibold text-sm">Project ID</th>
                        <th className="p-4 text-left font-semibold text-sm">Project Name</th>
                        <th className="p-4 text-right font-semibold text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>SCM (₹ Cr)</span>
                          </div>
                        </th>
                        <th className="p-4 text-right font-semibold text-sm">
                          <div className="flex items-center justify-end gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Target Completion</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.length > 0 ? (
                        projects.map((project, index) => (
                          <tr
                            key={project.id}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                            <td className="p-4 font-mono text-[#1E6091] font-medium">{project.project_id}</td>
                            <td className="p-4 text-gray-900">{project.project_name}</td>
                            <td className="p-4 text-right text-gray-700 font-medium">₹{project.scm} Cr</td>
                            <td className="p-4 text-right text-gray-700">
                              {dayjs(project.target_completion).format('DD-MM-YYYY')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500">
                            No ongoing projects found
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
                    <h3 className="text-xl font-bold text-gray-900">Project Visual Progress</h3>
                  </div>
                </div>
                <div className="space-y-8">
                  {projects.map((project) =>
                    project.images && project.images.length > 0 && (
                      <div key={project.id} className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0">
                        <h4 className="text-lg font-semibold text-[#1E6091] mb-4">
                          {project.project_name} ({project.project_id})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {project.images.map((img) => (
                            <div
                              key={img.id}
                              className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                              onClick={() => openImageModal(img.image)}
                            >
                              <img
                                src={img.image}
                                alt={img.caption || 'Project Image'}
                                className="w-full h-48 object-cover"
                              />
                              {img.caption && (
                                <div className="p-3 bg-gray-50">
                                  <p className="text-sm text-gray-700">{img.caption}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {nextUrl && (
              <div className="text-center">
                <button
                  onClick={() => fetchProjects(nextUrl)}
                  className="px-6 py-3 bg-[#1E6091] text-white rounded-lg hover:bg-[#184E77] transition-colors font-medium disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Project"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;

