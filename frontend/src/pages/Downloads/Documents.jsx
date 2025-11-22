import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Vite-only: import all PDFs under this folder as URLs
const localFiles = import.meta.glob("./Documents/*.pdf", { eager: true, as: "url" });

function prettify(name) {
  // "SmartCity_Final_Report.pdf" -> "SmartCity Final Report"
  return name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ");
}

export default function Documents() {
  const [apiDocs, setApiDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Map local PDFs to a uniform shape
  const staticDocs = useMemo(() => {
    return Object.entries(localFiles).map(([path, url]) => {
      const file = path.split("/").pop() || "document.pdf";
      return {
        id: `static-${file}`,     // unique id
        title: prettify(file),
        file: url,                // absolute URL produced by Vite
        isApi: false,
      };
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/documents/");
        // normalize API docs to the same shape
        const shaped = (Array.isArray(data) ? data : []).map(d => ({
          id: `api-${d.id}`,
          title: d.title,
          file: d.file,     // absolute URL from your serializer
          rawId: d.id,
          isApi: true,
        }));
        setApiDocs(shaped);
      } catch (e) {
        setErr("Failed to fetch documents");
        console.error("Failed to fetch documents", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Merge lists (you can sort if you want)
  const combined = [...apiDocs, ...staticDocs];

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="bg-white p-6" data-cy="documents-page">
      <h1 className="text-3xl font-bold text-[#184E77] mb-8 border-b border-gray-200 pb-4">Documents</h1>

      <ul className="space-y-3">
        {combined.map(doc => (
          <li key={doc.id} className="border-b border-gray-100 py-2">
            {doc.isApi ? (
              // API-backed docs: go to detail route (keeps your existing flow)
              <Link
                to={`/downloads/${doc.rawId}`}
                className="text-[#1E6091] hover:text-[#184E77] hover:underline transition-colors"
              >
                {doc.title}
              </Link>
            ) : (
              // Local static PDFs: direct link to file
              <a
                href={doc.file}
                target="_blank"
                rel="noreferrer"
                className="text-[#1E6091] hover:text-[#184E77] hover:underline transition-colors"
              >
                {doc.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
