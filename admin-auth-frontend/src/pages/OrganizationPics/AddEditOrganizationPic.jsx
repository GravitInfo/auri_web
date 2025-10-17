import React, { useState } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditOrganizationPic({ fetchPics, editPic, onClose }) {
  const [images, setImages] = useState([]);
  const [orgId, setOrgId] = useState(editPic ? editPic.orgid : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await api.post(`/organization-pics/upload/${orgId}`, formData);

      fetchPics();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">
        {editPic ? "Edit Pictures" : "Add Pictures"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Organization ID"
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full"
          required={!editPic}
        />
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
