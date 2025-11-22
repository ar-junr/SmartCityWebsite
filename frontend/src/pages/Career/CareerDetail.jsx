import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFilePdf } from "react-icons/fa6";
const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/careers/${id}/`)
      .then(res => {
        setCareer(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Career not found or an error occurred.");
      });
  }, [id]);
  if (error) {
    return <p className="text-red-600 p-6">{error}</p>;
  }
  if (!career) {
    return <p className="text-gray-600 p-6">Loading...</p>;
  }
  return (
    <div className="p-6 max-w-4xl mx-auto" data-cy="career-detail-page">
      <h1 className="text-3xl font-bold mb-4 text-[#184E77]">{career.title}</h1>

      <div className="mb-4 text-gray-700 space-y-2">
        <p><strong>Status:</strong> {career.status}</p>
        <p><strong>Posted On:</strong> {career.posted_on}</p>
        <p><strong>Career No:</strong> {career.no}</p>
        <p><strong>Last Date to Apply:</strong> {career.last_date_to_apply || '—'}</p>
        {career.link && (
          <p className="mt-2">
            <strong>Link:</strong>{' '}
            <a href={career.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {career.link}
            </a>
          </p>
        )}

      </div>
      {career.pdf && (
        <a
          href={career.pdf}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <FaFilePdf className="mr-2" />
          View PDF Notification
        </a>
      )}
    </div>
  );
};
export default CareerDetail;