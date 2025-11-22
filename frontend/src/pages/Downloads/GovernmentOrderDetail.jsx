import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const GovernmentOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/government-orders/${id}/`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);
  if (!order) return <p>Loading...</p>;
  return (
    <div className="p-6 max-w-4xl mx-auto" data-cy="government-order-detail-page">
      <h1 className="text-2xl font-bold mb-4">{order.title}</h1>
      <p className="text-gray-600 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
      <a href={order.pdf} target="_blank" rel="noreferrer" className="text-blue-600 underline">Download Order</a>
    </div>
  );
};
export default GovernmentOrderDetail;