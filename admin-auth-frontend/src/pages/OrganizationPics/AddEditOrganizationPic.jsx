import React, { useState, useEffect } from "react"; 
import api, { BASE_URL } from "../../utils/config";

export default function AddEditOrganizationPic({ fetchPics, editPic, orgId, onClose }) {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [status, setStatus] = useState(editPic ? editPic.status === "active" : true); // true = active, false = inactive

  // Prepare preview for editPic
  useEffect(() => {
    if (editPic) {
      setPreviewImages([`${BASE_URL}/uploads/orgs/${editPic.image}`]);
      setStatus(editPic.status === "active"); // set initial status
    }
  }, [editPic]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  // Handle submit



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!orgId) return alert("Organization ID not found");

  try {
    const formData = new FormData();
    formData.append("orgid", orgId);
    formData.append("status", status ? "active" : "inactive"); // append status

    // Only append new image if user selected one
    if (images.length > 0) {
      formData.append("images", images[0]);
    }

    if (editPic) {
      await api.put(`/organization-pics/${editPic.org_pic_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      if (images.length === 0) return alert("Please select an image to upload");
      await api.post(`/organization-pics/upload/${orgId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    fetchPics();
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
        {/* Status Toggle */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <span className="font-medium">{status ? "Active" : "Inactive"}</span>
          <div
            onClick={() => setStatus(!status)}
            className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
              status ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                status ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

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
