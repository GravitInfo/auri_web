import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ViewBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/banners/${id}`);
        setBanner(res.data);
      } catch (err) {
        console.error("Error loading banner:", err);
      }
    };
    fetchBanner();
  }, [id]);

  if (!banner)
    return (
      <p className="p-6 text-gray-500 text-center text-lg">
        Loading banner details...
      </p>
    );

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4 sm:mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Banner Info */}
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {banner.bn_name}
        </h1>
        <div className="space-y-2 text-sm sm:text-base">
          <p className="text-gray-700">
            <span className="font-semibold">Deal:</span> {banner.deal_desc}
          </p>
          <p className="text-gray-700 break-words">
            <span className="font-semibold">Description:</span> {banner.desc}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span> {banner.status}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Colours:</span> {banner.colours}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Link:</span>{" "}
            <a
              href={banner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {banner.link}
            </a>
          </p>
        </div>
      </div>

      {/* Banner Image */}
      {banner.pic && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Banner Image</h2>
          <img
            src={`http://localhost:5000/uploads/banners/${banner.pic}`}
            alt={banner.bn_name}
            className="w-full sm:w-2/3 lg:w-1/2 h-auto object-cover rounded-lg shadow"
          />
        </div>
      )}

    </div>
  );
}
