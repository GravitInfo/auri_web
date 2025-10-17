import React, { useEffect, useState } from "react";
import api from "../../utils/config";

export default function AddEditOrgService({ fetchServices, editService, onClose, orgId }) {
  const [scId, setScId] = useState(editService ? editService.sc_id : "");
  const [srName, setSrName] = useState(editService ? editService.sr_name : "");
  const [rate, setRate] = useState(editService ? editService.rate : "");
  const [duration, setDuration] = useState(editService ? editService.duration : "");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const catRes = await api.get(`/service-cat`);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Dropdown fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { orgid: orgId, sc_id: scId, sr_name: srName, rate, duration };

      if (editService) {
        await api.put(`/org-services/${editService.org_sid}`, payload);
      } else {
        await api.post(`/org-services`, payload);
      }

      fetchServices();
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">
        {editService ? "Edit Service" : "Add Service"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={scId}
          onChange={(e) => setScId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.sc_id} value={cat.sc_id}>
              {cat.sr_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Service Name"
          value={srName}
          onChange={(e) => setSrName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border px-3 py-2 rounded"
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
