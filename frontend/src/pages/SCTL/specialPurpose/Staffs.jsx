import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Users,
  Building,
  Settings,
} from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../../config/api';

const Staffs = () => {
  const [executive, setExecutive] = useState([]);
  const [technical, setTechnical] = useState([]);
  const [administrative, setAdministrative] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [site, setSite] = useState([]);

  // Priority Map
  const positionPriority = {
    'chief executive officer': 1,
    'gm': 2,
    'finance officer': 3,
    'senior manager': 4,
    'manager': 5,
    'assistant manager': 6,
    'it officer': 7,
    'junior expert': 8,
    'site engineer': 9,
    'senior site engineer': 10,
    'quantity surveyor': 11,
    'pa to ceo': 12,
    'data entry operator': 13,
    'office assistant': 14,
    'legal intern': 15,
    'accounts': 16,
    'civil staff': 17,
  };

  // Sorting Function
  const sortByPositionPriority = (list) => {
    return list.slice().sort((a, b) => {
      const aPriority = positionPriority[a.position?.toLowerCase()] || 999;
      const bPriority = positionPriority[b.position?.toLowerCase()] || 999;
      return aPriority - bPriority;
    });
  };

  useEffect(() => {
    axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.STAFF))
      .then(res => {
        const grouped = {
          team: [],
          technical: [],
          admin: [],
          piu: [],
          site: [],
        };

        res.data.forEach((staff) => {
          const category = staff.category?.toLowerCase().trim() || '';
          if (category === 'team') grouped.team.push(staff);
          else if (category === 'technical team') grouped.technical.push(staff);
          else if (category === 'administration team') grouped.admin.push(staff);
          else if (category === 'piu team') grouped.piu.push(staff);
          else if (category === 'site engineers') grouped.site.push(staff);
        });

        setExecutive(sortByPositionPriority(grouped.team));
        setTechnical(sortByPositionPriority(grouped.technical));
        setAdministrative(sortByPositionPriority(grouped.admin));
        setConsultants(sortByPositionPriority(grouped.piu));
        setSite(sortByPositionPriority(grouped.site));
      });
  }, []);

  const getImageSize = (category) => {
    switch (category?.toLowerCase()) {
      case 'team':
        return 'h-[24rem]';
      case 'technical team':
        return 'h-[20rem]';
      case 'administration team':
        return 'h-[16rem]';
      case 'piu team':
        return 'h-[14rem]';
      case 'site engineers':
      default:
        return 'h-[12rem]';
    }
  };

  const StaffCard = ({ member, accentColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const imageSizeClass = getImageSize(member.category);

    return (
      <div className="bg-white rounded-lg border border-gray-200 hover:border-[#1E6091] hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-5">
          {/* Image */}
          <div className={`w-full overflow-hidden rounded-lg mb-4 ${imageSizeClass} bg-gray-100`}>
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1E6091] to-[#184E77] flex items-center justify-center text-white font-bold text-2xl">
                {member.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'NA'}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 mb-1">{member.name || 'N/A'}</h4>
            <p className={`text-sm font-semibold ${accentColor} mb-2`}>{member.position || '-'}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            {member.email && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Mail className="h-3.5 w-3.5 text-[#1E6091] flex-shrink-0" />
                <a href={`mailto:${member.email}`} className="hover:text-[#1E6091] transition-colors truncate">
                  {member.email}
                </a>
              </div>
            )}
            {member.phone && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone className="h-3.5 w-3.5 text-[#1E6091] flex-shrink-0" />
                <a href={`tel:${member.phone}`} className="hover:text-[#1E6091] transition-colors">
                  {member.phone}
                </a>
              </div>
            )}
          </div>

          {/* Expandable Details */}
          {(member.qualifications || member.experience) && (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-center gap-2 text-xs font-medium ${accentColor} hover:bg-gray-50 py-2 px-3 rounded-md transition-colors border border-gray-200`}
              >
                <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                  {member.qualifications && (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">Qualifications</span>
                      </div>
                      <p className="text-xs text-gray-600 pl-6 leading-relaxed">{member.qualifications}</p>
                    </div>
                  )}
                  {member.experience && (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">Experience</span>
                      </div>
                      <p className="text-xs text-gray-600 pl-6 leading-relaxed">{member.experience}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const StaffSection = ({ title, icon, staff, accentColor }) => {
    if (staff.length === 0) return null;
    
    return (
      <div>
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
          <div className={`${accentColor}`}>{icon}</div>
          <h3 className={`text-xl font-bold ${accentColor}`}>{title}</h3>
          <span className="text-sm text-gray-500 ml-auto">({staff.length})</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member, index) => (
            <StaffCard key={member.id || index} member={member} accentColor={accentColor} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-[#1E6091]" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Team</h2>
        </div>
        <p className="text-gray-600 mt-2">
          Meet the dedicated professionals who are transforming Thiruvananthapuram into a smart, sustainable city.
        </p>
      </div>

      <div className="space-y-10">
        <StaffSection
          title="Executive Leadership"
          icon={<Building className="h-5 w-5" />}
          staff={executive}
          accentColor="text-[#184E77]"
        />

        <StaffSection
          title="Technical Team"
          icon={<Settings className="h-5 w-5" />}
          staff={technical}
          accentColor="text-[#1E6091]"
        />

        <StaffSection
          title="Administrative Staff"
          icon={<Briefcase className="h-5 w-5" />}
          staff={administrative}
          accentColor="text-[#184E77]"
        />

        <StaffSection
          title="PIU Team"
          icon={<Users className="h-5 w-5" />}
          staff={consultants}
          accentColor="text-[#1E6091]"
        />

        <StaffSection
          title="Site Engineers"
          icon={<Users className="h-5 w-5" />}
          staff={site}
          accentColor="text-[#52796F]"
        />
      </div>
    </div>
  );
};

export default Staffs;
