import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, User, Building2, Mail, MessageSquare, Upload, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/complaintBanner.jpg';

const RegisterComplaint = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    complaint: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('project', formData.project);
    data.append('complaint', formData.complaint);
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }
    try {
      await axios.post(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.COMPLAINTS), data);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen" data-cy="register-complaint-page">
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
            {t('complaint.bannerTitle') || 'Register A Complaint'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitted ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className='w-10 h-10 text-green-600' />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('complaint.success.title')}</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">{t('complaint.success.message')}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-[#1E6091] hover:bg-[#184E77] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              {t('complaint.success.button')}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-6 h-6 text-[#1E6091]" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('complaint.formTitle')}</h2>
              </div>
              <p className="text-gray-600 mt-2">{t('complaint.formSubtitle')}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">
                    {t('complaint.fields.name')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('complaint.placeholders.name')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                    {t('complaint.fields.email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('complaint.placeholders.email')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="project" className="block text-gray-700 font-medium mb-2 text-sm">
                  {t('complaint.fields.project')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    placeholder={t('complaint.placeholders.project')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="complaint" className="block text-gray-700 font-medium mb-2 text-sm">
                  {t('complaint.fields.complaint')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="complaint"
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder={t('complaint.placeholders.complaint')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6091] focus:border-transparent"
                  ></textarea>
                </div>
              </div>
              <div>
                <label htmlFor="attachment" className="block text-gray-700 font-medium mb-2 text-sm">
                  {t('complaint.fields.attachment')}
                </label>
                <label htmlFor="attachment" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Upload className="w-6 h-6 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">{t('complaint.upload.click')}</span> {t('complaint.upload.drag')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t('complaint.upload.formats')}</p>
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
                <input id="terms" type="checkbox" className="w-4 h-4 text-[#1E6091] border-gray-300 rounded" required />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  {t('complaint.fields.checkbox')}
                </label>
              </div>
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 px-8 bg-[#1E6091] hover:bg-[#184E77] text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : t('complaint.submitButton')}
                </button>
              </div>
            </form>
          </div>
        )}

        {!submitted && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-4 text-center text-[#1E6091]">
              {t('complaint.contactBox.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="p-3 bg-[#1E6091]/10 rounded-full w-fit mx-auto mb-3">
                  <Phone className="w-6 h-6 text-[#1E6091]" />
                </div>
                <p className="font-medium text-sm text-gray-700 mb-1">{t('complaint.contactBox.call')}</p>
                <a href="tel:+9104714010374" className="text-[#1E6091] hover:underline text-sm">+91-0471-4010374</a>
              </div>
              <div>
                <div className="p-3 bg-[#1E6091]/10 rounded-full w-fit mx-auto mb-3">
                  <Mail className="w-6 h-6 text-[#1E6091]" />
                </div>
                <p className="font-medium text-sm text-gray-700 mb-1">{t('complaint.contactBox.email')}</p>
                <a href="mailto:info@smartcitytvm.in" className="text-[#1E6091] hover:underline text-sm">info@smartcitytvm.in</a>
              </div>
              <div>
                <div className="p-3 bg-[#1E6091]/10 rounded-full w-fit mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-[#1E6091]" />
                </div>
                <p className="font-medium text-sm text-gray-700 mb-1">{t('complaint.contactBox.visit')}</p>
                <p className="text-xs text-gray-600">{t('complaint.contactBox.address')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RegisterComplaint;