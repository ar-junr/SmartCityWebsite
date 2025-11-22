import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PdfFile from '../../assets/images/pdfFile.png'; // ✅ use same icon
import { formatDateTime } from '../../data/dateFormatter';

const TenderDetail = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tenders/${id}/`)
      .then(res => setTender(res.data))
      .catch(err => console.error('Error fetching tender:', err));
  }, [id]);
  useEffect(() => {
    if (tender) {
      console.log('📅 Raw UTC:', tender.last_date_to_submit);
      console.log('🕒 Formatted IST:', formatDateTime(tender.last_date_to_submit));
    }
  }, [tender]);



  if (!tender) {
    return <p className="p-6 text-gray-600">Loading tender details...</p>;
  }

  const isExpired = new Date(tender.last_date_to_submit) < new Date();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-[#184E77] mb-8 leading-snug">{tender.title}</h1>

        <div className="space-y-6 text-gray-800 text-lg">
          <p>
            <strong className="block text-gray-700 mb-1">Tender No:</strong>
            {tender.no}
          </p>

          <p>
            <strong className="block text-gray-700 mb-1">Status:</strong>
            <span
              className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${isExpired || tender.status === 'Closed'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-green-100 text-green-800'
                }`}
            >
              {isExpired ? 'Closed' : tender.status}
            </span>
          </p>

          <p>
            <strong className="block text-gray-700 mb-1">Deadline:</strong>
            {formatDateTime(tender.last_date_to_submit)}
            {isExpired && (
              <span className="ml-3 text-red-600 text-base font-semibold">(Expired)</span>
            )}
          </p>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <a
              href={tender.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#1E6091] hover:text-[#184E77] text-lg underline"
            >
              <img src={PdfFile} alt="PDF" className="w-6 h-6 mr-3" />
              Download Tender PDF
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TenderDetail;
