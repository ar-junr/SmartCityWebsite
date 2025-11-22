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
    axios.get('http://localhost:8000/api/staff/')
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
      <div className="bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col">
            <div className={`w-full overflow-hidden mb-4 ${imageSizeClass}`}>
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-[#1E6091] flex items-center justify-center text-white font-bold text-3xl">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
              <p className={`text-sm font-medium ${accentColor} mb-1`}>{member.position}</p>
              {member.category && (
                <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 inline-block">
                  {member.category}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${member.email}`} className="hover:text-[#1E6091] transition-colors">
                {member.email}
              </a>
            </div>
            {member.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4" />
                <a href={`tel:${member.phone}`} className="hover:text-[#1E6091] transition-colors">
                  {member.phone}
                </a>
              </div>
            )}
          </div>

          {(member.qualifications || member.experience) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-full mt-4 flex items-center justify-center gap-2 text-sm ${accentColor} hover:bg-gray-50 py-2 px-4 transition-colors`}
            >
              <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-in slide-in-from-top-2 duration-300">
              {member.qualifications && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Qualifications</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-6">{member.qualifications}</p>
                </div>
              )}
              {member.experience && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Experience</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-6">{member.experience}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const StaffSection = ({ title, icon, staff, accentColor }) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`${accentColor}`}>{icon}</div>
        <h3 className={`text-2xl font-bold ${accentColor}`}>{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member, index) => (
          <StaffCard key={index} member={member} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="staff" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#184E77] mb-4">Our Team</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Meet the dedicated professionals who are transforming Thiruvananthapuram into a smart, sustainable city.
          </p>
        </div>

        <StaffSection
          title="Executive Leadership"
          icon={<Building className="h-6 w-6" />}
          staff={executive}
          accentColor="text-[#184E77]"
        />

        <StaffSection
          title="Technical Team"
          icon={<Settings className="h-6 w-6" />}
          staff={technical}
          accentColor="text-[#1E6091]"
        />

        <StaffSection
          title="Administrative Staff"
          icon={<Briefcase className="h-6 w-6" />}
          staff={administrative}
          accentColor="text-[#184E77]"
        />

        <StaffSection
          title="PIU Team"
          icon={<Users className="h-6 w-6" />}
          staff={consultants}
          accentColor="text-[#1E6091]"
        />

        <StaffSection
          title="Site Engineers"
          icon={<Users className="h-6 w-6" />}
          staff={site}
          accentColor="text-[#52796F]"
        />
      </div>
    </section>
  );
};

export default Staffs;
