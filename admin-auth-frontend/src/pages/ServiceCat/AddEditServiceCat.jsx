// import React, { useState } from "react";
// import api from "../../utils/config"; // ✅ centralized api

// export default function AddEditServiceCat({ fetchCategories, editCategory, onClose }) {
//   const [name, setName] = useState(editCategory ? editCategory.sr_name : "");
//   const [description, setDescription] = useState(editCategory ? editCategory.sr_s_desc : "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editCategory) {
//         await api.put(`/service-cat/${editCategory.sc_id}`, {
//           sr_name: name,
//           sr_s_desc: description,
//         });
//       } else {
//         await api.post("/service-cat", {
//           sr_name: name,
//           sr_s_desc: description,
//         });
//       }
//       fetchCategories();
//       onClose();
//     } catch (error) {
//       console.error("Error saving category:", error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-slide-down transition-all duration-300 pointer-events-auto">
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//           {editCategory ? "Edit Service Category" : "Add Service Category"}
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           {/* Category Name */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2 text-lg">Category Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter category name"
//               className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2 text-lg">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter description"
//               rows="5"
//               className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-semibold"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditServiceCat({ fetchCategories, editCategory, onClose }) {
  const [formData, setFormData] = useState({
    sr_name: "",
    sr_name_ar: "",
    sr_s_desc: "",
    icon: null,
    status: "active",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // 🟢 Initialize data once on mount or when editCategory changes
  useEffect(() => {
    if (editCategory) {
      setFormData({
        sr_name: editCategory.sr_name || "",
        sr_name_ar: editCategory.sr_name_ar || "",
        sr_s_desc: editCategory.sr_s_desc || "",
        icon: null, // reset file input
        status: editCategory.status || "active",
      });

      // Set existing icon preview
      setPreviewImage(
        editCategory.icon ? `${BASE_URL}/uploads/icons/${editCategory.icon}` : null
      );
    } else {
      setFormData({
        sr_name: "",
        sr_name_ar: "",
        sr_s_desc: "",
        icon: null,
        status: "active",
      });
      setPreviewImage(null);
    }
  }, [editCategory]);

  // 🟢 Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, icon: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 🟢 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("sr_name", formData.sr_name);
      formDataToSend.append("sr_name_ar", formData.sr_name_ar);
      formDataToSend.append("sr_s_desc", formData.sr_s_desc);
      formDataToSend.append("status", formData.status);

      if (formData.icon instanceof File) {
        formDataToSend.append("icon", formData.icon);
      }

      if (editCategory) {
        await api.put(`/service-cat/${editCategory.sc_id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/service-cat", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchCategories();
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category. Check console for details.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-auto transition-all duration-300">
      <div className="p-10">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          {editCategory ? "Edit Service Category" : "Add Service Category"}
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          encType="multipart/form-data"
        >
          {/* Name (English) */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Category Name (English)</label>
            <input
              type="text"
              name="sr_name"
              value={formData.sr_name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Name (Arabic) */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Category Name (Arabic)</label>
            <input
              type="text"
              name="sr_name_ar"
              value={formData.sr_name_ar}
              onChange={handleChange}
              placeholder="Enter Arabic name"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 font-semibold mb-2">Short Description</label>
            <textarea
              name="sr_s_desc"
              value={formData.sr_s_desc}
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Icon Upload */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Category Icon</label>
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {previewImage && (
              <div className="mt-3 flex justify-start">
                <img
                  src={previewImage}
                  alt="Icon Preview"
                  className="w-20 h-20 object-contain border rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-5 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
