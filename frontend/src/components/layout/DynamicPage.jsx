import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pages/`)
      .then(res => {
        const match = res.data.find(p => p.navigation_item.href === `/${slug}`);
        setPage(match);
      });
  }, [slug]);

  if (!page) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{page.title}</h1>
      <p className="mt-4">{page.description}</p>
      {page.message && <p className="mt-2 font-medium">{page.message}</p>}
      {page.image && <img src={`http://127.0.0.1:8000${page.image}`} alt="Dynamic" className="mt-4 max-w-full" />}
      {page.pdf && (
        <a href={`http://127.0.0.1:8000${page.pdf}`} className="text-blue-600 underline mt-2 block" target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      )}
    </div>
  );
};

export default DynamicPage;
