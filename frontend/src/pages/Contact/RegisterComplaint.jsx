import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/complaintBanner.jpg';
import { GrStatusGood } from "react-icons/gr";
import { FaRegUser, FaRegBuilding } from "react-icons/fa";
import { MdOutlineEmail, MdMailOutline } from "react-icons/md";
import { LuMessageSquareText } from "react-icons/lu";
import { IoCloudUploadOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";
const RegisterComplaint = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    complaint: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('project', formData.project);
    data.append('complaint', formData.complaint);
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/complaints/', data);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" data-cy="register-complaint-page">
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 60, 80, 0.85), rgba(0, 128, 128, 0.6)), url(${Banner})`
        }} />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg">
            {t('complaint.bannerTitle')}
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GrStatusGood className='text-5xl text-[#184E77]' />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('complaint.success.title')}</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">{t('complaint.success.message')}</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 bg-[#184E77] hover:bg-[#1E6091] text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
              {t('complaint.success.button')}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('complaint.formTitle')}</h2>
              <p className="text-gray-600">{t('complaint.formSubtitle')}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    {t('complaint.fields.name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRegUser className='text-gray-400 text-md' />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('complaint.placeholders.name')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    {t('complaint.fields.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdOutlineEmail className='text-gray-400 text-lg' />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('complaint.placeholders.email')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="project" className="block text-gray-700 font-medium mb-2">
                  {t('complaint.fields.project')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaRegBuilding className='absolute left-3 top-3 text-gray-400 text-lg' />
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    placeholder={t('complaint.placeholders.project')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="complaint" className="block text-gray-700 font-medium mb-2">
                  {t('complaint.fields.complaint')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <LuMessageSquareText className='absolute top-3 left-3 text-gray-400 text-lg' />
                  <textarea
                    id="complaint"
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder={t('complaint.placeholders.complaint')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              <div>
                <label htmlFor="attachment" className="block text-gray-700 font-medium mb-2">
                  {t('complaint.fields.attachment')}
                </label>
                <label htmlFor="attachment" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <IoCloudUploadOutline className='text-xl text-gray-600' />
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">{t('complaint.upload.click')}</span> {t('complaint.upload.drag')}
                  </p>
                  <p className="text-xs text-gray-500">{t('complaint.upload.formats')}</p>
                  <input
                    id="attachment"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }))
                    }
                  />
                </label>
              </div>
              <div className="flex items-center">
                <input id="terms" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300" required />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  {t('complaint.fields.checkbox')}
                </label>
              </div>
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="py-3 px-8 bg-[#184E77] hover:bg-[#1E6091] text-white font-bold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                >
                  {t('complaint.submitButton')}
                </button>
              </div>
            </form>
          </div>
        )}
        {!submitted && (
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
            <h3 className="text-xl font-bold mb-3 text-center" style={{ color: '#1A759F' }}>
              {t('complaint.contactBox.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <IoCallOutline className='text-5xl text-[#184E77] mx-auto mb-2 bg-blue-100 rounded-full p-2' />
                <p className="font-medium">{t('complaint.contactBox.call')}</p>
                <a href="tel:+9104714010374" className="text-[#1E6091] hover:underline">+91-0471-4010374</a>
              </div>
              <div>
                <MdMailOutline className='text-5xl text-[#184E77] mx-auto mb-2 bg-blue-100 rounded-full p-2' />
                <p className="font-medium">{t('complaint.contactBox.email')}</p>
                <a href="mailto:info@smartcitytvm.in" className="text-[#1E6091] hover:underline">info@smartcitytvm.in</a>
              </div>
              <div>
                <IoLocationOutline className='text-5xl text-[#184E77] mx-auto mb-2 bg-blue-100 rounded-full p-2' />
                <p className="font-medium">{t('complaint.contactBox.visit')}</p>
                <p className="text-sm">{t('complaint.contactBox.address')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RegisterComplaint;