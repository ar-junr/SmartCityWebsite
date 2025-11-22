// src/components/footer/FooterNewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const FooterNewsDetail = () => {
  const { id } = useParams();
  const [mediaItem, setMediaItem] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/media/${id}/`)
      .then(res => setMediaItem(res.data))
      .catch(err => console.error("Error loading media item:", err));
  }, [id]);
  if (!mediaItem) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{mediaItem.title}</h1>
      {mediaItem.image && (
        <img
          src={mediaItem.image}
          alt={mediaItem.title}
          className="w-full h-auto rounded shadow mb-6"
        />
      )}
      <p className="text-gray-600 mb-2">📅 {new Date(mediaItem.date).toLocaleDateString('en-GB')}</p>
      {mediaItem.description ? (
        <p className="text-gray-700 whitespace-pre-line">{mediaItem.description}</p>
      ) : (
        <p className="text-gray-500 italic">No description available.</p>
      )}

    </div>
  );
};
export default FooterNewsDetail;