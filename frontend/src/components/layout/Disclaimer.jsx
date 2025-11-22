import React from 'react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-cy="disclaimer-page" >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-3">
            Disclaimer
          </h1>
          <div className="w-20 h-1 bg-[#1E6091] mx-auto"></div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 md:p-8 shadow-sm">
          <p className="text-gray-700 leading-relaxed">
            All the information on this website - <span className="text-[#1E6091]">https://www.smartcitytvm.in</span> - is published in good faith and for general information purpose only. smartcitytvm does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (smartcitytvm), is strictly at your own risk. smartcitytvm will not be liable for any losses and/or damages in connection with the use of our website.
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
          <p>Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;