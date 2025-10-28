
// import React, { useState,  } from "react";
// import api, { BASE_URL } from "../../utils/config";

// export default function AddEditServiceProvider({ existingProvider,  orgId, onSuccess, onClose }) {
//   const [formData, setFormData] = useState({
//     sp_name: existingProvider?.sp_name || "",
//     designation: existingProvider?.designation || "",
//     status: existingProvider?.status || "active",
//     orgid: existingProvider?.orgid || orgId,
//     // org_sid: existingProvider?.org_sid || "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(
//     existingProvider?.pic ? `${BASE_URL}/uploads/providers/${existingProvider.pic}` : null
//   );
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//       if (image) data.append("pic", image);

//       if (existingProvider) {
//         await api.put(`/service-providers/${existingProvider.sp_id}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await api.post(`/service-providers`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       onSuccess();
//     } catch (err) {
//       console.error("Submit error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-96">
//       <h2 className="text-xl font-semibold mb-4 text-left">
//         {existingProvider ? "Edit Service Provider" : "Add Service Provider"}
//       </h2>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <input
//           name="sp_name"
//           value={formData.sp_name}
//           onChange={handleChange}
//           placeholder="Service Provider Name"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           name="designation"
//           value={formData.designation}
//           onChange={handleChange}
//           placeholder="Designation"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           name="orgid"
//           value={formData.orgid}
//           onChange={handleChange}
//           placeholder="Organization ID"
//           className="w-full border p-2 rounded"
//           required
//           disabled
//         />

//         {/* <input
//           name="org_sid"
//           value={formData.org_sid}
//           onChange={handleChange}
//           placeholder="Org Service ID"
//           className="w-full border p-2 rounded"
//         /> */}

//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>
//            <input
//                type="file" 
//               onChange={handleFileChange} 
//               accept="image/*"  
//               className="w-full border px-3 py-2 rounded" 
//               />
//         {/* Image Preview */}
//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//            className="w-16 h-16 mt-2 object-contain rounded-md"
//           />
//         )}

       

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? "Saving..." : existingProvider ? "Update" : "Add"}
//           </button>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }













































import React, { useState } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditServiceProvider({ existingProvider, orgId, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    sp_name: existingProvider?.sp_name || "",
    designation: existingProvider?.designation || "",
    status: existingProvider?.status || "active",
    orgid: existingProvider?.orgid || orgId,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    existingProvider?.pic ? `${BASE_URL}/uploads/providers/${existingProvider.pic}` : null
  );
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Toggle active/inactive
  const toggleStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("pic", image);

      if (existingProvider) {
        await api.put(`/service-providers/${existingProvider.sp_id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/service-providers`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/30 z-50 px-4 pt-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {existingProvider ? "Edit Service Provider" : "Add Service Provider"}
        </h2>

        {/* Status Toggle */}
        <div className="flex justify-end items-center gap-3 mb-4">
          <span className="font-medium text-gray-700">
            {formData.status === "active" ? "Active" : "Inactive"}
          </span>
          <div
            onClick={toggleStatus}
            className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
              formData.status === "active" ? "bg-sky-600" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                formData.status === "active" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Service Provider Name</label>
            <input
              name="sp_name"
              value={formData.sp_name}
              onChange={handleChange}
              placeholder="Service Provider Name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Designation</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Organization ID */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Organization ID</label>
            <input
              name="orgid"
              value={formData.orgid}
              disabled
              className="border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Provider Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {preview && (
              <div className="mt-3 flex justify-start">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-contain rounded-md shadow-md"
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
              disabled={loading}
              className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
            >
              {loading ? "Saving..." : existingProvider ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



