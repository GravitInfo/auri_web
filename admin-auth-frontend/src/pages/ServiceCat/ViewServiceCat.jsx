// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import api from "../../utils/config"; // ✅ centralized api

// export default function ViewServiceCat() {
//   const { id } = useParams();
//   const [category, setCategory] = useState(null);
//   const navigate = useNavigate();

//   const fetchCategory = async () => {
//     try {
//       const res = await api.get(`/service-cat/${id}`);
//       setCategory(res.data);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, [id]);

//   if (!category) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
//       >
//         <ArrowLeft className="w-4 h-4" /> Back
//       </button>

//       <h2 className="text-2xl font-bold mb-4">Service Category Details</h2>

//       <div className="bg-white shadow rounded-lg p-6 space-y-2">
//         <p><strong>ID:</strong> {category.sc_id}</p>
//         <p><strong>Name:</strong> {category.sr_name}</p>
//         <p><strong>Name (Arabic):</strong> {category.sr_name_ar || "-"}</p>
//         <p><strong>Description:</strong> {category.sr_s_desc || "-"}</p>
//         <p><strong>Status:</strong> {category.status}</p>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api, { BASE_URL } from "../../utils/config"; // ✅ centralized api config

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
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Service Category Details
      </h2>

      {/* ✅ Main Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          <p>
            <strong>ID:</strong> {category.sc_id}
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

          <div className="sm:col-span-2">
            <p>
              <strong>Short Description:</strong>
            </p>
            <p className="text-gray-700 whitespace-pre-line">
              {category.sr_s_desc || "-"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p>
              <strong>Icon:</strong>
            </p>
            {category.icon ? (
              <img
                src={`${BASE_URL}/uploads/icons/${category.icon}`}
                alt="Category Icon"
                className="w-24 h-24 mt-2 border rounded-lg object-contain bg-gray-50 p-2"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            ) : (
              <p className="text-gray-500 italic mt-1">No icon uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

