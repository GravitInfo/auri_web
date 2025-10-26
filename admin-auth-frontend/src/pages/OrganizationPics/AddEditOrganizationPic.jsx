// import React, { useState } from "react";
// import api, { BASE_URL } from "../../utils/config";

// export default function AddEditOrganizationPic({ fetchPics, editPic, onClose }) {
//   const [images, setImages] = useState([]);
//   const [orgId, setOrgId] = useState(editPic ? editPic.orgid : "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }

//       await api.post(`/organization-pics/upload/${orgId}`, formData);

//       fetchPics();
//       onClose();
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-96">
//       <h2 className="text-xl font-semibold mb-4">
//         {editPic ? "Edit Pictures" : "Add Pictures"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="number"
//           placeholder="Organization ID"
//           value={orgId}
//           onChange={(e) => setOrgId(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setImages(e.target.files)}
//           className="w-full"
//           required={!editPic}
//         />
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Save
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









import React, { useState, useEffect } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditOrganizationPic({ fetchPics, editPic, orgId, onClose }) {
  // Use orgId from parent automatically
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // 🔹 Prepare preview for editPic
  useEffect(() => {
    if (editPic) {
      setPreviewImages([`${BASE_URL}/uploads/orgs/${editPic.image}`]);
    }
  }, [editPic]);

  // 🔹 Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orgId) return alert("Organization ID not found");

    try {
      const formData = new FormData();
      formData.append("orgid", orgId); // automatically use orgId

      if (images.length > 0) {
        images.forEach((file) => formData.append("images", file));
      }

      if (editPic) {
        // Edit existing picture
        await api.put(`/organization-pics/${editPic.org_pic_id}`, formData);
      } else {
        // Add new picture(s)
        await api.post(`/organization-pics/upload/${orgId}`, formData);
      }

      fetchPics(); // Refresh pictures
      onClose();
    } catch (error) {
      console.error("Upload/Edit error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">
        {editPic ? "Edit Picture" : "Add Pictures"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File input */}
        <input
          type="file"
          multiple={!editPic}
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Preview */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Preview"
                className="w-20 h-20 object-contain rounded-md shadow-sm"
              />
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
