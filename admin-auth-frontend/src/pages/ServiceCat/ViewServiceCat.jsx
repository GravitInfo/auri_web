import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../utils/config"; // ✅ centralized api

export default function ViewServiceCat() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

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

  if (!category) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Service Category Details</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <p><strong>ID:</strong> {category.sc_id}</p>
        <p><strong>Name:</strong> {category.sr_name}</p>
        <p><strong>Name (Arabic):</strong> {category.sr_name_ar || "-"}</p>
        <p><strong>Description:</strong> {category.sr_s_desc || "-"}</p>
        <p><strong>Status:</strong> {category.status}</p>
      </div>
    </div>
  );
}
