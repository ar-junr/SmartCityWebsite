import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, X } from 'lucide-react';
import axios from 'axios';

const BoardOfDirectors = () => {
  const [members, setMembers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/board-members/')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error("Error fetching board members:", error);
      });
  }, []);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(members.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    if (members.length > itemsPerSlide) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [members, currentSlide, itemsPerSlide]);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Board of Directors</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our distinguished board members who guide our organization with their expertise and vision
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                    {members
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((member, index) => (
                        <div
                          key={index}
                          onClick={() => openModal(member)}
                          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                        >
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                            <p className="text-blue-600 font-semibold text-sm mb-2">{member.position}</p>
                            {member.field && (
                              <p className="text-gray-600 text-sm mb-2">{member.field}</p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto shadow-lg mb-6 border-4 border-gray-200"
              />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
              <p className="text-blue-600 font-semibold text-lg mb-4">{selectedMember.position}</p>
              {selectedMember.field && (
                <p className="text-gray-600 text-md">{selectedMember.field}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardOfDirectors;