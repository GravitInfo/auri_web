import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api, { BASE_URL } from "../../utils/config";

export default function ViewBanner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await api.get(`/banners/${id}`);
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
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4 sm:mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-3">
        <h1 className="text-2xl font-bold text-gray-800">{banner.bn_name}</h1>
        <p><strong>Deal:</strong> {banner.deal_desc}</p>
        <p><strong>Description:</strong> {banner.desc}</p>
        <p><strong>Status:</strong> {banner.status}</p>
        <p><strong>Colours:</strong> {banner.colours}</p>
        <p>
          <strong>Link:</strong>{" "}
          <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {banner.link}
          </a>
        </p>
      </div>

      {banner.pic && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Banner Image</h2>
          <img
            src={`${BASE_URL}/uploads/banners/${banner.pic}`}
            alt={banner.bn_name}
            className="w-full sm:w-2/3 lg:w-1/2 rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}
