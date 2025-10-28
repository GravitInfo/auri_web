import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import api, { BASE_URL } from "../../utils/config";

export default function ViewServiceCat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      const res = await api.get(`/service-cat/${id}`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  if (!category)
    return (
      <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
        Loading category details...
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

      {/* ==================== Category Card ==================== */}
      <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-bl text-[#1b3a7a] from-[#14b8a6] to-[#0891b2] w-24 h-24 opacity-10 rounded-bl-full"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#defcf7] p-3 rounded-2xl">
            <Layers size={32} className="text-[#1b3a7a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1b3a7a]">
            {category.sr_name}
          </h1>
        </div>

        {/* ==================== Details ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#1b3a7a]">
          <p>
            <strong>Category ID:</strong> {category.sc_id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                category.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {category.status}
            </span>
          </p>

          <p>
            <strong>Category Name (English):</strong> {category.sr_name}
          </p>
          <p>
            <strong>Category Name (Arabic):</strong>{" "}
            {category.sr_name_ar || "-"}
          </p>

          {category.sr_s_desc && (
            <p className="md:col-span-2">
              <strong>Short Description:</strong>{" "}
              <span className="text-[#1b3a7a]/80">{category.sr_s_desc}</span>
            </p>
          )}
        </div>

        {/* ==================== Icon Section ==================== */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#1b3a7a] mb-3">
            Category Icon
          </h3>
          {category.icon ? (
            <div className="bg-[#f4fdfb] border border-[#cceae6] rounded-2xl p-4 inline-block shadow-sm">
              <img
                src={`${BASE_URL}/uploads/icons/${category.icon}`}
                alt="Category Icon"
                className="w-28 h-28 rounded-xl object-contain bg-white border border-[#bde7e2] p-2"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">No icon uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
