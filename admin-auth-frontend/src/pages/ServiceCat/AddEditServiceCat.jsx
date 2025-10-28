// import React, { useEffect, useState } from "react";
// import api, { BASE_URL } from "../../utils/config";

// export default function AddEditServiceCat({ fetchCategories, editCategory, onClose }) {
//   const [formData, setFormData] = useState({
//     sr_name: "",
//     sr_name_ar: "",
//     sr_s_desc: "",
//     icon: null,
//     status: "active",
//   });

//   const [previewImage, setPreviewImage] = useState(null);

//   // 🟢 Initialize data once on mount or when editCategory changes
//   useEffect(() => {
//     if (editCategory) {
//       setFormData({
//         sr_name: editCategory.sr_name || "",
//         sr_name_ar: editCategory.sr_name_ar || "",
//         sr_s_desc: editCategory.sr_s_desc || "",
//         icon: null, // reset file input
//         status: editCategory.status || "active",
//       });

//       // Set existing icon preview
//       setPreviewImage(
//         editCategory.icon ? `${BASE_URL}/uploads/icons/${editCategory.icon}` : null
//       );
//     } else {
//       setFormData({
//         sr_name: "",
//         sr_name_ar: "",
//         sr_s_desc: "",
//         icon: null,
//         status: "active",
//       });
//       setPreviewImage(null);
//     }
//   }, [editCategory]);

//   // 🟢 Handle text input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🟢 Handle file selection and preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, icon: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // 🟢 Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("sr_name", formData.sr_name);
//       formDataToSend.append("sr_name_ar", formData.sr_name_ar);
//       formDataToSend.append("sr_s_desc", formData.sr_s_desc);
//       formDataToSend.append("status", formData.status);

//       if (formData.icon instanceof File) {
//         formDataToSend.append("icon", formData.icon);
//       }

//       if (editCategory) {
//         await api.put(`/service-cat/${editCategory.sc_id}`, formDataToSend, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await api.post("/service-cat", formDataToSend, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       fetchCategories();
//       onClose();
//     } catch (error) {
//       console.error("Error saving category:", error);
//       alert("Failed to save category. Check console for details.");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-auto transition-all duration-300">
//       <div className="p-10">
//         {/* Title */}
//         <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
//           {editCategory ? "Edit Service Category" : "Add Service Category"}
//         </h2>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//           encType="multipart/form-data"
//         >
//           {/* Name (English) */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2">Category Name (English)</label>
//             <input
//               type="text"
//               name="sr_name"
//               value={formData.sr_name}
//               onChange={handleChange}
//               placeholder="Enter category name"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Name (Arabic) */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2">Category Name (Arabic)</label>
//             <input
//               type="text"
//               name="sr_name_ar"
//               value={formData.sr_name_ar}
//               onChange={handleChange}
//               placeholder="Enter Arabic name"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col md:col-span-2">
//             <label className="text-gray-700 font-semibold mb-2">Short Description</label>
//             <textarea
//               name="sr_s_desc"
//               value={formData.sr_s_desc}
//               onChange={handleChange}
//               placeholder="Enter description"
//               rows="4"
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//             />
//           </div>

//           {/* Icon Upload */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2">Category Icon</label>
//             <input
//               type="file"
//               name="icon"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />

//             {previewImage && (
//               <div className="mt-3 flex justify-start">
//                 <img
//                   src={previewImage}
//                   alt="Icon Preview"
//                   className="w-20 h-20 object-contain border rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Status */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-2">Status</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4 mt-5 md:col-span-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
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
  const [status, setStatus] = useState(true); // true = active, false = inactive

  useEffect(() => {
    if (editCategory) {
      setFormData({
        sr_name: editCategory.sr_name || "",
        sr_name_ar: editCategory.sr_name_ar || "",
        sr_s_desc: editCategory.sr_s_desc || "",
        icon: null,
        status: editCategory.status || "active",
      });
      setPreviewImage(
        editCategory.icon ? `${BASE_URL}/uploads/icons/${editCategory.icon}` : null
      );
      setStatus(editCategory.status === "active");
    } else {
      setFormData({
        sr_name: "",
        sr_name_ar: "",
        sr_s_desc: "",
        icon: null,
        status: "active",
      });
      setPreviewImage(null);
      setStatus(true);
    }
  }, [editCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleStatus = () => {
    setStatus((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      status: !status ? "active" : "inactive",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, icon: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append("sr_name", formData.sr_name);
      dataToSend.append("sr_name_ar", formData.sr_name_ar);
      dataToSend.append("sr_s_desc", formData.sr_s_desc);
      dataToSend.append("status", formData.status);
      if (formData.icon instanceof File) dataToSend.append("icon", formData.icon);

      if (editCategory) {
        await api.put(`/service-cat/${editCategory.sc_id}`, dataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/service-cat", dataToSend, {
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 pt-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {editCategory ? "Edit Service Category" : "Add Service Category"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Status Toggle at Top */}
          <div className="flex justify-end items-center gap-3 mb-4">
            <span className="font-medium text-gray-700">{status ? "Active" : "Inactive"}</span>
            <div
              onClick={handleToggleStatus}
              className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
                status ? "bg-sky-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  status ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>

          {/* Category Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Category Name (English)</label>
            <input
              type="text"
              name="sr_name"
              value={formData.sr_name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Category Name Arabic */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Category Name (Arabic)</label>
            <input
              type="text"
              name="sr_name_ar"
              value={formData.sr_name_ar}
              onChange={handleChange}
              placeholder="Enter Arabic name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Short Description</label>
            <textarea
              name="sr_s_desc"
              value={formData.sr_s_desc}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Icon Upload */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Category Icon</label>
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {previewImage && (
              <div className="mt-3 flex justify-start w-full">
                <img
                  src={previewImage}
                  alt="Icon Preview"
                  className="w-20 h-20 object-contain shadow-md hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editCategory ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
