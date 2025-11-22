import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const InternshipDetail = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/internships/${id}/`)
      .then(res => setInternship(res.data))
      .catch(err => console.error('Error fetching internship:', err));
  }, [id]);
  if (!internship) return <p className="p-6 text-center">Loading...</p>;
  return (
    <div className="max-w-4xl mx-auto p-6" data-cy="internship-detail-page">
      <h1 className="text-3xl font-bold text-[#184E77] mb-4">{internship.title}</h1>
      {internship.post && (
        <p className="text-gray-800 mb-2">
          <strong>Post:</strong> {internship.post}
        </p>
      )}
      {internship.date && (
        <p className="text-gray-800 mb-2">
          <strong>Deadline:</strong> {internship.date}
        </p>
      )}
      {internship.status && (
        <p className="text-gray-800 mb-2">
          <strong>Status:</strong> {internship.status}
        </p>
      )}
      {internship.pdf_link && (
        <a
          href={internship.pdf_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-[#1E6091] text-white rounded hover:bg-[#184E77] transition"
        >
          Download PDF
        </a>
      )}
      {internship.external_url && (
        <a
          href={internship.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 ml-4 px-4 py-2 border border-[#1E6091] text-[#1E6091] rounded hover:bg-[#1E6091] hover:text-white transition"
        >
          Visit External Link
        </a>
      )}
    </div>
  );
};
export default InternshipDetail;