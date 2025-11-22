import React from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/rtiBanner.jpg';
import RTIAct from './PDFFile/RTI2005Act.pdf';
import RTIForm from './PDFFile/RTIApplication.pdf';
import RTIGuideline from './PDFFile/Guidelines.pdf';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa6';
const RTI = () => {
  const { t } = useTranslation();
  const officers = [
    { title: t('rti.officers.appellate'), name: 'Rahul Krishna Sharma IAS', designation: 'CEO, SCTL', email: 'ceo@smartcitytvm.in' },
    { title: t('rti.officers.pio'), name: 'Krishna Kumar S', designation: 'General Manager (Operations)', email: 'gm@smartcitytvm.in' },
    { title: t('rti.officers.apio'), name: 'Anitha R', designation: 'Manager (Administration)', email: 'admin@smartcitytvm.in' }
  ];
  return (
    <div className="bg-gray-50" data-cy="rti-page">
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})` }} />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">{t('rti.banner')}</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1E6091]">{t('rti.officerTitle')}</h2>
          <p className="text-gray-700 mb-8">{t('rti.officerDescription')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {officers.map((o, i) => (
              <div key={i} className="border p-5 shadow-sm" style={{ borderColor: ['#1E6091', '#184E77', '#1A759F'][i] }}>
                <h3 className="font-bold text-lg mb-3 pb-2 border-b border-gray-200" style={{ color: ['#1E6091', '#184E77', '#1A759F'][i] }}>{o.title}</h3>
                <p className="font-medium text-gray-800">{o.name}</p>
                <p className="text-gray-600 mb-3">{o.designation}</p>
                <a href={`mailto:${o.email}`} className="text-[#184E77] hover:text-[#1E6091] flex items-start">
                  <MdOutlineEmail className='text-xl mt-1 mr-2 text-[#184E77]' />{o.email}
                </a>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-bold mb-4 text-[#1E6091]">{t('rti.address')}</h3>
            <div className="space-y-2 text-gray-700">
              {t('rti.addressLines', { returnObjects: true }).map((line, i) => <p key={i}>{line}</p>)}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center">
                  <MdOutlineEmail className='text-gray-500 text-lg mr-1' />
                  <span>{t('rti.email')}: <a href="mailto:info@smartcitytvm.in" className="text-[#1A759F] hover:text-[#184E77]">info@smartcitytvm.in</a></span>
                </div>
                <div className="flex items-center">
                  <MdOutlinePhone className='text-gray-500 text-xl mr-1' />
                  <span>{t('rti.phone')}: <a href="tel:+9104714010374" className="text-[#1A759F] hover:text-[#184E77]">+91 - 0471 - 4010374</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#1E6091]">{t('rti.aboutRTI')}</h2>
          <p className="text-gray-700 mb-6">{t('rti.aboutText')}</p>
          <div className="bg-gray-50 p-4 mb-6">
            <h3 className="font-bold mb-3 text-[#1E6091]">{t('rti.keyProvisions')}</h3>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {t('rti.provisionsList', { returnObjects: true }).map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4">
              <h3 className="font-bold mb-4 text-[#1E6091]">{t('rti.howToFile')}</h3>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                {t('rti.howToList', { returnObjects: true }).map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-4 text-[#1E6091]">{t('rti.feeStructure')}</h3>
              <ul className="space-y-3">
                {Object.keys(t('rti.feeList', { returnObjects: true })).map((key) => (
                  <li key={key} className="flex justify-between border-b border-gray-200 pb-2">
                    <span>{t(`rti.feeList.${key}`)}</span>
                    <span>{t(`rti.feeValues.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-6 text-[#1E6091]">{t('rti.downloadsTitle')}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={RTIForm} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-300 text-[#1E6091] font-medium py-2 px-4 shadow-sm hover:bg-gray-50 transition flex items-center">
              <FaFilePdf className='text-lg mr-1' />{t('rti.form')}
            </a>
            <a href={RTIAct} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-300 text-[#1E6091] font-medium py-2 px-4 shadow-sm hover:bg-gray-50 transition flex items-center">
              <FaFilePdf className='text-lg mr-1' />{t('rti.act')}
            </a>
            <a href={RTIGuideline} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-300 text-[#1E6091] font-medium py-2 px-4 shadow-sm hover:bg-gray-50 transition flex items-center">
              <FaFilePdf className='text-lg mr-1' />{t('rti.guideline')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RTI;