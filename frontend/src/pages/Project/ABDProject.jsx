import React from 'react';
import Banner from '../../assets/banners/ABDPageBanner.png';
import ParkImage from '../../assets/images/park.png';
import DrinkingWaterImage from '../../assets/images/water.jpg';
import Gateway from '../../assets/images/gateway.jpg';
import MLCPImage from '../../assets/images/mlcpThampanoor.jpg';
import SreeChitraPark from '../../assets/images/sreeChithraPark.jpg';

const ABDProject = () => {
  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">ABD Projects</h1>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Project 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <img
              src={ParkImage}
              alt="Children's Park"
              className="w-full h-auto object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#184E77] mb-4 pb-2 border-b border-[#1E6091]">
              Redevelopment of Children's Park, KWA Linked Green Activity
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Children's Park is opposite Museum Junction, owned by Kerala Water Authority and maintained by Rotary Club.
              In SCTL's proposal, apart from improved landscape, illumination and rejuvenation of existing water fountain works,
              there are many more elements of interest introduced like live size open chess, water features, rope bridge,
              open gym and children's park, food kiosk, elder's corner, roller skating and an interesting entry feature.
              The park will have CCTV surveillance.
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <img
              src={DrinkingWaterImage}
              alt="Drinking Water Kiosk"
              className="w-full h-auto object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#184E77] mb-4 pb-2 border-b border-[#1E6091]">
              Installation of Drinking Water Kiosks at 25 locations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This project aims at making potable water available at 25 public locations throughout the ABD area.
              Drinking Water Kiosk Project Locations are as follows:
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-5 text-gray-700">
              <li className="list-decimal">Inside Sree Chithra Park</li>
              <li className="list-decimal">Corporation Campus-1</li>
              <li className="list-decimal">Corporation Campus-2</li>
              <li className="list-decimal">Near Gandhi park cafeteria</li>
              <li className="list-decimal">Within Putharikandam Maidanam-1</li>
              <li className="list-decimal">Within Putharikandam Maidanam-2</li>
              <li className="list-decimal">Within Putharikandam Maidanam-3</li>
              <li className="list-decimal">Woman & Child Hospital Thycaud-1</li>
              <li className="list-decimal">Woman & Child Hospital Thycaud-2</li>
              <li className="list-decimal">Inside Govt UP School Thampanoor</li>
              <li className="list-decimal">Anganwadi Rajaji Nagar</li>
              <li className="list-decimal">Govt Model BHSS Thycaud-1</li>
              <li className="list-decimal">Govt Model BHSS Thycaud-2</li>
              <li className="list-decimal">Near Chalai New Market block-1</li>
              <li className="list-decimal">Near Chalai New Market block-2</li>
              <li className="list-decimal">RMS Thampanoor Bus stand</li>
              <li className="list-decimal">General Hospital Trivandrum</li>
              <li className="list-decimal">Near SMV School</li>
              <li className="list-decimal">Opposite SBI Vazhuthacaud</li>
              <li className="list-decimal">Opposite Sweet Mahal, near leather shop at Bakery Junction</li>
              <li className="list-decimal">Near University College entrance</li>
              <li className="list-decimal">Opposite to Kanakakunnu, in front of Childrens park</li>
              <li className="list-decimal">Near Sree Chitra home entrance</li>
              <li className="list-decimal">Near Nandavanam Book stalls</li>
            </ol>
          </div>
        </div>

        {/* Project 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <img
              src={Gateway}
              alt="Putharikkandam Maidanam Gateway"
              className="w-full h-auto object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#184E77] mb-4 pb-2 border-b border-[#1E6091]">
              Construction of OAT and Park at Putharikkandam Maidanam
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This project aims at redeveloping Putharikandam Maidanam at East Fort. The proposal includes Entrance Gateway
              which is being extended to create a grand entry to the maidanam, a tensile roofing over E K Nayanar Memorial Plaza
              in order to bring a permanent shade to the area, OAT, renovating the compound wall, introducing a theme park,
              landscape work in the pathway park around the maidanam, illumination works and ICT components like Wi-Fi Hotspot,
              CCTV, Emergency call box, public information display system.
            </p>
          </div>
        </div>

        {/* Project 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="w-full md:w-1/2">
            <img
              src={MLCPImage}
              alt="Multi Level Car Parking"
              className="w-full h-auto object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#184E77] mb-4 pb-2 border-b border-[#1E6091]">
              Construction of Multi Level Car Parking at Thampanoor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Construction of Multilevel car and bike parking at Corporation land: area 50.25 cents,
              opposite Thampanoor Railway Station. This project envisages creation of a G+4 storeyed
              smart parking system for 22 cars and around 400 bike parking spaces along with an electric
              vehicle charging system.
            </p>
          </div>
        </div>

        {/* Project 5 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={SreeChitraPark}
              alt="Sree Chitra Park"
              className="w-full h-auto object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#184E77] mb-4 pb-2 border-b border-[#1E6091]">
              Redevelopment of Sree Chitra Park
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The project 'Urban Street Haat: Charithra Veedhi' aims to create a new landmark location
              for Trivandrum city within the East Fort. Sree Chithra Park and a part of the adjacent Taluk
              Road is being reimagined in this project. The interventions would be redevelopment of Sree
              Chitra park by increasing softscape, introducing a band stand, a traditional Mandapam, Craft
              Stalls, a Selfie point and a light & sound show with dry water fountain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABDProject;