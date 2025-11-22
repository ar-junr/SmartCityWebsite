import React, { useState } from 'react';
import { Smile, Meh, Frown, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config/api';
import { useTranslation } from 'react-i18next';
import Banner from '../../assets/banners/pollBanner.jpg';

const Poll = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) return;
    setLoading(true);
    try {
      await axios.post(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.POLL_FEEDBACK), {
        rating: selectedOption,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen" data-cy="poll-page">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 78, 119, 0.9), rgba(30, 96, 145, 0.8)), url(${Banner})`,
          }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
            {t('poll.title') || 'How is our website?'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitted ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center" data-cy="poll-success">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className='w-10 h-10 text-green-600' />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('poll.thankYouTitle')}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {t('poll.thankYouMessage')}
            </p>
            <button
              data-cy="submit-another"
              onClick={() => {
                setSubmitted(false);
                setSelectedOption(null);
              }}
              className="mt-4 bg-[#1E6091] hover:bg-[#184E77] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              {t('poll.submitAnother')}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="mb-6 pb-4 border-b border-gray-200 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {t('poll.weValue')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('poll.ratePrompt')}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {['nice', 'medium', 'bad'].map(option => {
                  const Icon = option === 'nice' ? Smile : option === 'medium' ? Meh : Frown;
                  const bg = {
                    nice: 'bg-green-50 border-green-200',
                    medium: 'bg-yellow-50 border-yellow-200',
                    bad: 'bg-red-50 border-red-200',
                  }[option];
                  return (
                    <label
                      key={option}
                      className={`flex flex-col items-center p-6 cursor-pointer transition-all duration-200 rounded-lg border-2 ${
                        selectedOption === option
                          ? `${bg} border-[#1E6091]`
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poll"
                        value={option}
                        className="hidden"
                        onChange={() => setSelectedOption(option)}
                      />
                      <div
                        className={`w-16 h-16 flex items-center justify-center mb-3 rounded-full transition-colors ${
                          selectedOption === option
                            ? 'bg-[#1E6091] text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="font-medium text-gray-800 capitalize text-sm">
                        {t(`poll.options.${option}`)}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!selectedOption || loading}
                  className={`py-3 px-8 font-semibold rounded-lg transition duration-300 ${
                    selectedOption && !loading
                      ? 'bg-[#1E6091] hover:bg-[#184E77] text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Submitting...' : t('poll.submitFeedback')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Additional Feedback */}
        {!submitted && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-3 text-center text-[#1E6091]">
              {t('poll.moreFeedbackTitle')}
            </h3>
            <p className="text-gray-700 text-center mb-4 text-sm">
              {t('poll.moreFeedbackMsg')}
            </p>
            <div className="text-center">
              <a
                href="mailto:info@smartcitytvm.in"
                target='_blank'
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#1E6091] hover:text-[#184E77] font-medium transition-colors"
              >
                {t('poll.sendEmail')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Poll;