// src/components/footer/FooterEventDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const FooterEventDetail = () => {
  const { id } = useParams();
  const [eventItem, setEventItem] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/events/${id}/`)
      .then(res => setEventItem(res.data))
      .catch(err => console.error("Error loading event item:", err));
  }, [id]);
  if (!eventItem) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{eventItem.title}</h1>
      {eventItem.image && (
        <img
          src={eventItem.image}
          alt={eventItem.title}
          className="w-full h-auto rounded shadow mb-6"
        />
      )}
      <p className="text-gray-600 mb-2">
        📅 {new Date(eventItem.date).toLocaleDateString('en-GB')}
      </p>

      {eventItem.description ? (
        <p className="text-gray-700 whitespace-pre-line">{eventItem.description}</p>
      ) : (
        <p className="text-gray-500 italic">No description available.</p>
      )}

    </div>
  );
};
export default FooterEventDetail;