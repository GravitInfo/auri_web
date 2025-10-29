import React, { useState, useEffect } from "react"; 
import api, { BASE_URL } from "../../utils/config";

export default function AddEditOrganizationPic({ fetchPics, editPic, orgId, onClose }) {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [status, setStatus] = useState(editPic ? editPic.status === "active" : true);

  useEffect(() => {
    if (editPic) {
      setPreviewImages([`${BASE_URL}/uploads/orgs/${editPic.image}`]);
      setStatus(editPic.status === "active");
    }
  }, [editPic]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orgId) return alert("Organization ID not found");

    try {
      const formData = new FormData();
      formData.append("orgid", orgId);
      formData.append("status", status ? "active" : "inactive");
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
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/30 z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {editPic ? "Edit Picture" : "Add Picture"}
        </h2>

        {/* Status Toggle */}
        <div className="flex justify-end items-center gap-3 mb-4">
          <span className="font-medium text-gray-700">{status ? "Active" : "Inactive"}</span>
          <div
            onClick={() => setStatus(!status)}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* File input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Select Image</label>
            <input
              type="file"
              multiple={!editPic}
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="flex justify-start gap-3 mt-3">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-25 h-24 object-contain  shadow-md hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}

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
              className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
            >
              {editPic ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


