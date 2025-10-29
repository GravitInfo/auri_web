import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Palette,
  Link as LinkIcon,
  FileText,
  Tag,
  ToggleLeft,
} from "lucide-react";
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
      <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
        Loading banner details...
      </p>
    );

  return (
    <div className="bg-[#f8fdfc] min-h-screen p-6 sm:p-10 space-y-10">
      {/* 🔙 Back Button */}
      <div className="flex items-center gap-3 text-[#1b3a7a]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:text-[#0d9488] transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* ==================== Banner Card ==================== */}
      <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-bl text-[#1b3a7a] from-[#14b8a6] to-[#0891b2] w-24 h-24 opacity-10 rounded-bl-full"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#defcf7] p-3 rounded-2xl">
            <ImageIcon size={32} className="text-[#1b3a7a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1b3a7a]">
            {banner.bn_name}
          </h1>
        </div>

        {/* ==================== Details ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#1b3a7a]">
          <p className="flex items-center gap-2">
            <Tag size={18} /> <strong>Deal:</strong> {banner.deal_desc}
          </p>

          <p className="flex items-center gap-2">
            <ToggleLeft size={18} /> <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                banner.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {banner.status}
            </span>
          </p>

          <p className="flex items-start gap-2 md:col-span-2">
            <FileText size={18} className="mt-1" />{" "}
            <strong>Description:</strong>{" "}
            <span className="text-[#1b3a7a]/80">{banner.desc}</span>
          </p>

          <p className="flex items-center gap-2">
            <Palette size={18} /> <strong>Colours:</strong>{" "}
            {banner.colours || "-"}
          </p>

          <p className="flex items-center gap-2">
            <LinkIcon size={18} /> <strong>Link:</strong>{" "}
            {banner.link ? (
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d9488] hover:underline break-all"
              >
                {banner.link}
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>

        {/* ==================== Image Section ==================== */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#1b3a7a] mb-3 flex items-center gap-2">
            <ImageIcon size={20} /> Banner Image
          </h3>
          {banner.pic ? (
            <div className="bg-[#f4fdfb] border border-[#cceae6] rounded-2xl p-4 inline-block shadow-sm">
              <img
                src={`${BASE_URL}/uploads/banners/${banner.pic}`}
                alt={banner.bn_name}
                className="w-[420px] h-[220px] object-cover rounded-xl border border-[#bde7e2]"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">No banner image uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

