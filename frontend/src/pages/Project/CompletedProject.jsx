import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../assets/banners/completeProjectBanner.png';

const CompletedProject = () => {
  const [projects, setProjects] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/completed-projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching completed projects:", err));
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
    <div className="bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Completed Projects</h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Celebrating our successful urban transformation initiatives
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Achievements</h2>
          <div className="h-0.5 w-24 bg-[#184E77] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            These successfully completed projects demonstrate our commitment to building a smarter,
            more sustainable Thiruvananthapuram across various sectors.
          </p>
        </div>

        {/* Table */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Completed Projects List</h3>
            <div className="text-sm text-gray-500">{projects.length} projects completed</div>
          </div>

          <div className="border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#184E77] text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-medium">No</th>
                    <th className="py-4 px-6 text-left font-medium">Project Name</th>
                    <th className="py-4 px-6 text-right font-medium">Amount (₹ in Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects
                    .filter(project => project.project_name)
                    .map((project, index) => (
                      <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-gray-700 font-medium">{index + 1}</td>
                        <td className="py-4 px-6 text-gray-700">{project.project_name}</td>
                        <td className="py-4 px-6 text-right text-gray-700 font-medium">{project.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Project Highlights</h3>
            <div className="text-sm text-gray-500">Click images to view</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.slice(0, 3).map((project, idx) =>
                project.images?.map((img, i) =>
                  idx === 0 && i === 0 ? (
                    <div
                      key={img.id}
                      className="md:col-span-2 h-96 overflow-hidden cursor-pointer group relative"
                      onClick={() => openLightbox(img)}
                    >
                      <img
                        src={img.image}
                        alt={img.caption || 'Project Image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 group-hover:opacity-100 transition-opacity duration-300">
                        <div>
                          <h3 className="text-xl font-bold text-white">{img.caption}</h3>
                        </div>
                      </div>
                    </div>
                  ) : null
                )
              )}

              {projects.slice(1, 3).flatMap(project =>
                project.images?.map((img) => (
                  <div
                    key={img.id}
                    className="h-80 overflow-hidden cursor-pointer group relative"
                    onClick={() => openLightbox(img)}
                  >
                    <img
                      src={img.image}
                      alt={img.caption || 'Project Image'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-bold text-white">{img.caption}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Vertical image on the right */}
            <div className="md:col-span-5">
              {projects[3]?.images?.[0] && (
                <div
                  className="h-full overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(projects[3].images[0])}
                >
                  <img
                    src={projects[3].images[0].image}
                    alt={projects[3].images[0].caption || 'Project'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-white">{projects[3].images[0].caption}</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#184E77] text-white p-8 border border-[#1E6091]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Transformation in Numbers</h2>
            <div className="h-0.5 w-24 bg-white mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg mb-8">
              Our completed projects have made a significant impact across the city,
              improving infrastructure, mobility, and quality of life for residents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 text-[#184E77]">
                <div className="text-3xl font-bold mb-2">{projects.length}</div>
                <div className="text-gray-700 font-medium">Projects Completed</div>
              </div>
              <div className="bg-white p-4 text-[#184E77]">
                <div className="text-3xl font-bold mb-2">₹{totalInvestment} Cr</div>
                <div className="text-gray-700 font-medium">Total Investment</div>
              </div>
              <div className="bg-white p-4 text-[#184E77]">
                <div className="text-3xl font-bold mb-2">24+</div>
                <div className="text-gray-700 font-medium">Locations Transformed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={closeLightbox}>
          <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50 hover:text-gray-300"
            >
              &times;
            </button>

            {/* Image */}
            <img
              src={currentImage.image}
              alt={currentImage.caption || 'Full View'}
              className="w-full max-h-[80vh] object-contain shadow-lg"
            />

            {/* Caption */}
            {currentImage.caption && (
              <p className="text-white text-center mt-4 text-lg">{currentImage.caption}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CompletedProject;
