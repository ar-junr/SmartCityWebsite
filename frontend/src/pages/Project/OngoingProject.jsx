import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const OngoingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  });

  const fetchProjects = async (url = 'api/ongoing-projects/', replace = false) => {
  try {
    setLoading(true);
    const res = await api.get(url);
    setProjects((prev) => replace ? res.data.results : [...prev, ...res.data.results]);
    setNextUrl(res.data.next);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch projects');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  fetchProjects('api/ongoing-projects/', true); 
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
    <div className="p-4 max-w-7xl mx-auto">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            alt="Project"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-center text-[#184E77]">Ongoing Projects</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Project Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border border-gray-300">
          <thead className="bg-[#184E77] text-white">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Project ID</th>
              <th className="py-3 px-4 text-left">Project Name</th>
              <th className="py-3 px-4 text-right">SCM (₹ Cr)</th>
              <th className="py-3 px-4 text-right">Target Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project, index) => (
              <tr key={project.id} className="bg-white hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-mono text-[#1E6091]">{project.project_id}</td>
                <td className="py-3 px-4">{project.project_name}</td>
                <td className="py-3 px-4 text-right">{project.scm}</td>
                <td className="py-3 px-4 text-right">
                  {dayjs(project.target_completion).format('DD-MM-YYYY')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gallery Section */}
      {projects.some(p => p.images.length > 0) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#184E77]">Project Visual Progress</h2>
          {projects.map((project) => (
            project.images.length > 0 && (
              <div key={project.id} className="mb-10 border border-gray-200 bg-white p-4">
                <h3 className="text-xl font-semibold mb-2 text-[#1E6091]">
                  {project.project_name} ({project.project_id})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((img) => (
                    <div
                      key={img.id}
                      className="cursor-pointer border border-gray-300 hover:shadow"
                      onClick={() => openImageModal(img.image)}
                    >
                      <img
                        src={img.image}
                        alt={img.caption || 'Project Image'}
                        className="w-full h-48 object-cover"
                      />
                      {img.caption && (
                        <div className="p-2 text-sm text-gray-700 text-center">{img.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {nextUrl && (
        <div className="text-center">
          <button
            onClick={() => fetchProjects(nextUrl)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;
