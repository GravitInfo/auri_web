
import React, { useState,  } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditServiceProvider({ existingProvider,  orgId, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    sp_name: existingProvider?.sp_name || "",
    designation: existingProvider?.designation || "",
    status: existingProvider?.status || "active",
    orgid: existingProvider?.orgid || orgId,
    // org_sid: existingProvider?.org_sid || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    existingProvider?.pic ? `${BASE_URL}/uploads/providers/${existingProvider.pic}` : null
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

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
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4 text-left">
        {existingProvider ? "Edit Service Provider" : "Add Service Provider"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="sp_name"
          value={formData.sp_name}
          onChange={handleChange}
          placeholder="Service Provider Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="orgid"
          value={formData.orgid}
          onChange={handleChange}
          placeholder="Organization ID"
          className="w-full border p-2 rounded"
          required
          disabled
        />

        {/* <input
          name="org_sid"
          value={formData.org_sid}
          onChange={handleChange}
          placeholder="Org Service ID"
          className="w-full border p-2 rounded"
        /> */}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
           <input
               type="file" 
              onChange={handleFileChange} 
              accept="image/*"  
              className="w-full border px-3 py-2 rounded" 
              />
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
           className="w-16 h-16 mt-2 object-contain rounded-md"
          />
        )}

       

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : existingProvider ? "Update" : "Add"}
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




