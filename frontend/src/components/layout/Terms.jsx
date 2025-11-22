import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-cy="terms-page">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-3">
            Terms and Conditions
          </h1>
          <div className="w-20 h-1 bg-[#1E6091] mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 md:p-8 shadow-sm">
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to the official website of <span className="font-semibold text-[#1E6091]">Smart City Thiruvananthapuram Limited (SCTL)</span>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the site.
          </p>

          {/* Terms Sections */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-2 border-b border-gray-200 pb-2">
                1. Website Use
              </h2>
              <p className="text-gray-600">
                This website is provided for informational purposes only. The content may change without notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-2 border-b border-gray-200 pb-2">
                2. Intellectual Property
              </h2>
              <p className="text-gray-600">
                All content, logos, and materials on this site are property of SCTL and protected by applicable copyright laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-2 border-b border-gray-200 pb-2">
                3. Limitations of Liability
              </h2>
              <p className="text-gray-600">
                SCTL shall not be liable for any indirect, incidental, or consequential damages resulting from the use of this website.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
          <p>Effective Date: June 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;