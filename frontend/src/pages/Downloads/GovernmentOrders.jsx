import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";

// Vite-only: import every PDF under ./govtOrders as a URL
const localFiles = import.meta.glob("./govtOrders/*.pdf", { eager: true, as: "url" });

function prettify(name) {
  return name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ");
}

export default function GovernmentOrders() {
  const [apiOrders, setApiOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shape local static orders
  const staticOrders = useMemo(() => {
    return Object.entries(localFiles).map(([path, url]) => {
      const file = path.split("/").pop() || "order.pdf";
      return {
        id: `static-${file}`,
        title: prettify(file),
        date: null,        // no date metadata from file system
        pdf: url,
        isApi: false,
      };
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/government-orders/");
        const shaped = (Array.isArray(data) ? data : []).map(o => ({
          id: `api-${o.id}`,
          rawId: o.id,
          title: o.title,
          date: o.date,    // ISO date from API
          pdf: o.pdf,
          isApi: true,
        }));
        setApiOrders(shaped);
      } catch (e) {
        console.error("Error fetching government orders:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Merge; optional: sort by date (API items first by date desc, then static)
  const combined = [
    ...apiOrders.sort((a,b) => (b.date || "").localeCompare(a.date || "")),
    ...staticOrders,
  ];

  const fmt = (d) => (d ? new Date(d).toLocaleDateString("en-GB") : "—");

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10" data-cy="government-orders-page">
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-[#184E77] text-white">
            <tr>
              <th className="p-3 border-b border-gray-300">No</th>
              <th className="p-3 border-b border-gray-300">Title</th>
              <th className="p-3 border-b border-gray-300">Date</th>
              <th className="p-3 border-b border-gray-300">Document</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {combined.map((row, idx) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-3 whitespace-nowrap">{idx + 1}</td>
                <td className="p-3 break-words">
                  {row.isApi ? (
                    <Link to={`/government-orders/${row.rawId}`} className="text-[#1E6091] hover:underline">
                      {row.title}
                    </Link>
                  ) : (
                    <a href={row.pdf} target="_blank" rel="noreferrer" className="text-[#1E6091] hover:underline">
                      {row.title}
                    </a>
                  )}
                </td>
                <td className="p-3 whitespace-nowrap">{fmt(row.date)}</td>
                <td className="p-3 text-center">
                  <a href={row.pdf} target="_blank" rel="noreferrer" className="text-[#1E6091] hover:text-[#184E77]">
                    <FaFilePdf className="text-xl inline-block" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional external link */}
      <div className="mt-6 text-center">
        <a
          href="https://go.lsgkerala.gov.in/pages/query.php?txtgo=SCTL%2CSmart+city+thiruvananthapuram&sbmtsearch=Search&select=tag&Start=23&Index=2"
          target="_blank" rel="noopener noreferrer"
          className="text-[#1E6091] hover:text-[#184E77] hover:underline"
        >
          View more government orders
        </a>
      </div>
    </div>
  );
}
