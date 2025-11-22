import React from 'react';
import { FileText, Mail, Phone, MapPin, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/rtiBanner.jpg';
import RTIAct from './PDFFile/RTI2005Act.pdf';
import RTIForm from './PDFFile/RTIApplication.pdf';
import RTIGuideline from './PDFFile/Guidelines.pdf';
import { FaFilePdf } from 'react-icons/fa6';

const RTI = () => {
  const { t } = useTranslation();
  const officers = [
    { title: t('rti.officers.appellate'), name: 'Rahul Krishna Sharma IAS', designation: 'CEO, SCTL', email: 'ceo@smartcitytvm.in' },
    { title: t('rti.officers.pio'), name: 'Krishna Kumar S', designation: 'General Manager (Operations)', email: 'gm@smartcitytvm.in' },
    { title: t('rti.officers.apio'), name: 'Anitha R', designation: 'Manager (Administration)', email: 'admin@smartcitytvm.in' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen" data-cy="rti-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            {t('rti.banner') || 'Right to Information Act'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Officers Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#1E6091]" />
                <h2 className="text-2xl font-bold text-gray-900">{t('rti.officerTitle')}</h2>
              </div>
              <p className="text-gray-600 text-sm mt-2">{t('rti.officerDescription')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {officers.map((o, i) => (
                <div
                  key={i}
                  className="border-2 rounded-lg p-5 shadow-sm"
                  style={{ borderColor: ['#1E6091', '#184E77', '#1A759F'][i] }}
                >
                  <h3
                    className="font-bold text-lg mb-3 pb-2 border-b border-gray-200"
                    style={{ color: ['#1E6091', '#184E77', '#1A759F'][i] }}
                  >
                    {o.title}
                  </h3>
                  <p className="font-medium text-gray-900 mb-1">{o.name}</p>
                  <p className="text-gray-600 text-sm mb-3">{o.designation}</p>
                  <a
                    href={`mailto:${o.email}`}
                    className="text-[#1E6091] hover:text-[#184E77] flex items-center gap-2 text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {o.email}
                  </a>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4 text-[#1E6091]">{t('rti.address')}</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                {t('rti.addressLines', { returnObjects: true })?.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>
                      {t('rti.email')}:{' '}
                      <a href="mailto:info@smartcitytvm.in" className="text-[#1E6091] hover:text-[#184E77] hover:underline">
                        info@smartcitytvm.in
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>
                      {t('rti.phone')}:{' '}
                      <a href="tel:+9104714010374" className="text-[#1E6091] hover:text-[#184E77] hover:underline">
                        +91 - 0471 - 4010374
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About RTI */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{t('rti.aboutRTI')}</h2>
            </div>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">{t('rti.aboutText')}</p>
            <div className="bg-gray-50 p-4 mb-6 rounded-lg">
              <h3 className="font-bold mb-3 text-[#1E6091]">{t('rti.keyProvisions')}</h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-gray-700">
                {t('rti.provisionsList', { returnObjects: true })?.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-4 text-[#1E6091]">{t('rti.howToFile')}</h3>
                <ol className="list-decimal list-inside space-y-2 pl-2 text-sm text-gray-700">
                  {t('rti.howToList', { returnObjects: true })?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[#1E6091]">{t('rti.feeStructure')}</h3>
                <ul className="space-y-3 text-sm">
                  {Object.keys(t('rti.feeList', { returnObjects: true }) || {}).map((key) => (
                    <li key={key} className="flex justify-between border-b border-gray-200 pb-2 text-gray-700">
                      <span>{t(`rti.feeList.${key}`)}</span>
                      <span className="font-medium">{t(`rti.feeValues.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 md:p-8 text-center">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Download className="w-5 h-5 text-[#1E6091]" />
                <h3 className="text-xl font-bold text-gray-900">{t('rti.downloadsTitle')}</h3>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={RTIForm}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#1E6091] text-[#1E6091] font-medium py-3 px-6 rounded-lg hover:bg-[#1E6091] hover:text-white transition-colors flex items-center gap-2"
              >
                <FaFilePdf className="text-lg" />
                {t('rti.form')}
              </a>
              <a
                href={RTIAct}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#1E6091] text-[#1E6091] font-medium py-3 px-6 rounded-lg hover:bg-[#1E6091] hover:text-white transition-colors flex items-center gap-2"
              >
                <FaFilePdf className="text-lg" />
                {t('rti.act')}
              </a>
              <a
                href={RTIGuideline}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#1E6091] text-[#1E6091] font-medium py-3 px-6 rounded-lg hover:bg-[#1E6091] hover:text-white transition-colors flex items-center gap-2"
              >
                <FaFilePdf className="text-lg" />
                {t('rti.guideline')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RTI;