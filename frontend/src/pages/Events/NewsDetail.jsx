import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const NewsDetail = () => {
  const { id } = useParams(); // get the news ID from URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/news/${id}/`)
      .then(res => {
        setNews(res.data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load news detail.');
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="text-blue-600 p-6">Loading...</div>;
  if (error) return <div className="text-red-600 p-6">{error}</div>;
  if (!news) return <div className="p-6 text-gray-600">No news found.</div>;
  return (
    <div className="max-w-4xl mx-auto p-6" data-cy="news-detail-page">
      <h1 className="text-3xl font-bold text-[#184E77] mb-4">{news.title}</h1>
      <p className="text-gray-500 mb-2">{new Date(news.date).toLocaleDateString()}</p>
      <img src={news.image} alt={news.title} className="w-full h-auto mb-4 rounded shadow" />
      <p className="mb-4 text-lg">{news.excerpt}</p>
      <p className="text-sm text-gray-700">
        Source: <a href={news.link} className="text-blue-600 underline" target="_blank" rel="noreferrer">{news.source}</a>
      </p>
    </div>
  );
};
export default NewsDetail;