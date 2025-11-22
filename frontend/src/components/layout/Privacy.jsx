import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-cy="privacy-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#184E77] mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-[#1E6091] mx-auto"></div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 md:p-8 shadow-sm">
          <p className="text-gray-700 leading-relaxed mb-6">
            Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you visit our website.
          </p>
          
          {/* Additional sections would go here */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Information Collection</h2>
              <p className="text-gray-600">We may collect personal information such as your name and email address when you voluntarily submit it through our forms.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Use of Information</h2>
              <p className="text-gray-600">The information we collect is used to provide and improve our services, communicate with you, and enhance your experience.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-[#1E6091] mb-3">Data Protection</h2>
              <p className="text-gray-600">We implement appropriate security measures to protect against unauthorized access, alteration, or destruction of your personal information.</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;