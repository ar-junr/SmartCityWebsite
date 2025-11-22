import React from 'react';
import PDFFile from '../../assets/images/pdfFile.png';
import ARFile1 from '../../pages/SCTL/Annual Report/1st-Annual-Report-2017-18-Final.pdf';
import ARFile2 from '../../pages/SCTL/Annual Report/Annual-Report-2018-19.pdf';
import ARFile3 from '../../pages/SCTL/Annual Report/Annual-Report-2019-2020.pdf';
import ARFile4 from '../../pages/SCTL/Annual Report/Annual-Report-2020-21.pdf';

const financials = [
  { id: 1, title: '1st Annual Report 2017-18', date: '2017-18', file: ARFile1 },
  { id: 2, title: '2nd Annual Report 2018-19', date: '2018-19', file: ARFile2 },
  { id: 3, title: '3rd Annual Report 2019-20', date: '2019-20', file: ARFile3 },
  { id: 4, title: '4th Annual Report 2020-21', date: '2020-21', file: ARFile4 },
];

const Financials = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full max-w-6xl mx-auto">
      <div className="overflow-x-auto shadow-sm">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-[#184E77] text-white">
            <tr>
              <th className="p-3 font-medium border-b border-[#1E6091]">No</th>
              <th className="p-3 font-medium border-b border-[#1E6091]">Title</th>
              <th className="p-3 font-medium border-b border-[#1E6091]">Date</th>
              <th className="p-3 font-medium border-b border-[#1E6091]">Documents</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {financials.map((financial, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
              >
                <td className="p-3">{financial.id}</td>
                <td className="p-3">{financial.title}</td>
                <td className="p-3">{financial.date}</td>
                <td className="p-3">
                  <a 
                    href={financial.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <img className="w-8" src={PDFFile} alt="PDF File" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;