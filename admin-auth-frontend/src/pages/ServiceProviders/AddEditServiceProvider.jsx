import React, { useState } from "react";
import api from "../../utils/config";

export default function AddEditServiceProvider({
  existingProvider,
  orgId,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    sp_name: existingProvider?.sp_name || "",
    designation: existingProvider?.designation || "",
    status: existingProvider?.status || "active",
    orgid: existingProvider?.orgid || orgId,
    org_sid: existingProvider?.org_sid || "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
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
      <input
        name="org_sid"
        value={formData.org_sid}
        onChange={handleChange}
        placeholder="Org Service ID"
        className="w-full border p-2 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : existingProvider ? "Update" : "Add"}
      </button>
    </form>
  );
}
