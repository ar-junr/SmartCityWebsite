import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PageView = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pages/${id}/`)
      .then(res => setPage(res.data))
      .catch(err => console.error('Error loading page', err));
  }, [id]);

  if (!page) return (
    <div className="flex items-center justify-center h-screen">
      <a href="/" className="text-blue-600 text-3xl p-4">Click here to go back to home</a>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      {page.image && (
        <img src={page.image} alt={page.title} className='w-full mb-4' />
      )}
      <p className="text-lg">{page.description}</p>
      {page.pdf && (
        <a
          href={page.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-600 underline"
        >
          View PDF
        </a>
      )}
    </div>
  );
};

export default PageView;
