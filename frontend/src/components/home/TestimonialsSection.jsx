import React from 'react';
import QuoteLeft from '../../assets/images/quote.png'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Abhijith D V",
      role: "Electrical Engineering Intern",
      quote: "In my position as an intern each day is an opportunity to learn and observe various processes. The hands-on experience with smart city projects has been invaluable to my professional development.",
      image: null
    },
    {
      id: 2,
      name: "Artysha",
      role: "Engineering Intern",
      quote: "Working with the Smart City team has given me practical experience that complements my academic studies. The mentorship program is exceptional and has helped me grow both technically and professionally.",
      image: null
    },
    {
      id: 3,
      name: "Gayathri",
      role: "Electrical Engineering Intern",
      quote: "Each day brings new challenges and learning opportunities. The collaborative environment encourages innovation and has allowed me to contribute meaningfully to impactful urban development projects.",
      image: null
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tulip Intern Testimonials
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our talented interns about their experiences working on transformative smart city projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600 mb-6">{testimonial.role}</p>
                </div>
                
                <div className="relative">
                  <img className="w-5 text-blue-100 text-4xl absolute -top-2 left-0" src={QuoteLeft} alt="QuoteLeft" />
                  <p className="text-gray-600 relative z-10 pl-8 italic">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
            View All Testimonials
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;