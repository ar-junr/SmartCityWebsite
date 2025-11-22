import React, { useState, useEffect } from 'react';
import { Users, X, Mail, Phone, Briefcase } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../../config/api';

const BoardOfDirectors = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.BOARD_MEMBERS))
      .then(response => {
        setMembers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching board members:", error);
        setLoading(false);
      });
  }, []);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6091]"></div>
        <p className="mt-4 text-gray-600">Loading board members...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-[#1E6091]" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Board of Directors</h2>
        </div>
        <p className="text-gray-600 mt-2">
          Meet our distinguished board members who guide our organization with their expertise and vision
        </p>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1E6091] text-white">
              <th className="p-4 text-left font-semibold text-sm">No</th>
              <th className="p-4 text-left font-semibold text-sm">Name</th>
              <th className="p-4 text-left font-semibold text-sm">Position</th>
              <th className="p-4 text-left font-semibold text-sm">Field</th>
              <th className="p-4 text-left font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No board members found
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr 
                  key={member.id || index} 
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                      <span className="font-medium text-gray-900">{member.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{member.position || '-'}</td>
                  <td className="p-4 text-gray-600">{member.field || '-'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openModal(member)}
                      className="px-4 py-2 text-sm font-medium text-[#1E6091] hover:bg-[#1E6091]/10 rounded-md transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={closeModal}>
          <div 
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              {selectedMember.image && (
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg mb-4 border-4 border-gray-200"
                />
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
              <p className="text-[#1E6091] font-semibold text-lg mb-1">{selectedMember.position}</p>
              {selectedMember.field && (
                <p className="text-gray-600 text-sm">{selectedMember.field}</p>
              )}
            </div>

            {(selectedMember.email || selectedMember.phone) && (
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {selectedMember.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-[#1E6091]" />
                    <a href={`mailto:${selectedMember.email}`} className="hover:text-[#1E6091] transition-colors">
                      {selectedMember.email}
                    </a>
                  </div>
                )}
                {selectedMember.phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-[#1E6091]" />
                    <a href={`tel:${selectedMember.phone}`} className="hover:text-[#1E6091] transition-colors">
                      {selectedMember.phone}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardOfDirectors;