import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get('query');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/search/?query=${query}`)
        .then((res) => {
          setResults(res.data);
          console.log("Search response:", res.data);

          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load results.');
        })
        .finally(() => setLoading(false));
    }
  }, [query]);

  // Mapping of search keys to frontend route paths
  const keyToRouteMap = {
    news: 'news',
    tenders: 'tenders',
    events: 'events',
    careers: 'careers',
    videos: 'videos',
    orders: 'government-orders',
    documents: 'downloads',
    mpr: 'mpr',
    internships: 'internships',
    conclave: 'conclave',
  };

  // Build the URL based on key and item ID
  const getItemUrl = (key, item) => {
    const baseRoute = keyToRouteMap[key] || key;
    return item.id ? `/${baseRoute}/${item.id}` : `/${baseRoute}`;
  };

  // Extract display title
  const getTitle = (item) => {
    return (
      item.title ||
      item.name ||
      item.caption ||
      item.month || // for mpr
      item.post ||  // for internship
      item.position || // for officials
      'Untitled'
    );
  };

  const highlight = (text, term) =>
    text.replace(new RegExp(`(${term})`, 'gi'), '<mark>$1</mark>');

  return (
    <div className="p-6 max-w-5xl mx-auto" data-cy="search-results">
      <h2 className="text-2xl font-bold mb-6 text-[#184E77]">
        Search Results for: <span className="text-black">{query}</span>
      </h2>

      {loading && <p className="text-[#184E77]">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {Object.entries(results).map(([key, items]) =>
        items.length > 0 ? (
          <div key={key} className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-[#184E77] capitalize">
              {key.replace(/_/g, ' ')}
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={getItemUrl(key, item)}
                    className="text-[#184E77] hover:underline"
                  >
                    {getTitle(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}

      {!loading &&
        !error &&
        Object.values(results).every((arr) => arr.length === 0) && (
          <p className="text-gray-600">No matching results found.</p>
        )}
      {/* The new "Go back to Home" button */}
      <div className="mt-8">
        <a
          href="/"
          className="inline-block bg-[#184E77] text-white font-bold py-2 px-4  hover:bg-[#1E6091] transition duration-300"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default SearchResults;