import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFilePdf } from "react-icons/fa6";
const DocumentsDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/documents/${id}/`)
      .then(res => setDocument(res.data))
      .catch(err => console.error(err));
  }, [id]);
  if (!document) return <p className="p-6 text-gray-600">Loading...</p>;
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto" data-cy="document-detail-page">
      <h1 className="text-3xl font-bold text-[#184E77] mb-6 border-b border-gray-200 pb-4">
        {document.title}
      </h1>
      <div className="flex items-center space-x-3">
        <FaFilePdf className="text-[#1E6091] text-2xl" />
        <a
          href={document.file}
          target="_blank"
          rel="noreferrer"
          className="text-[#1E6091] hover:text-[#184E77] underline text-lg"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};
export default DocumentsDetail;