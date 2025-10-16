import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddEditOrgService({ fetchServices, editService, onClose }) {
  const [orgId, setOrgId] = useState(editService ? editService.orgid : "");
  const [scId, setScId] = useState(editService ? editService.sc_id : "");
  const [srName, setSrName] = useState(editService ? editService.sr_name : "");
  const [rate, setRate] = useState(editService ? editService.rate : "");
  const [duration, setDuration] = useState(editService ? editService.duration : "");
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchDropdownData = async () => {
    try {
      const orgRes = await axios.get("http://localhost:5000/api/organization");
      setOrganizations(orgRes.data);

      const catRes = await axios.get("http://localhost:5000/api/service-cat");
      setCategories(catRes.data);
    } catch (error) {
      console.error("Dropdown fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { orgid: orgId, sc_id: scId, sr_name: srName, rate, duration };

      if (editService) {
        await axios.put(`http://localhost:5000/api/org-services/${editService.org_sid}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/org-services", payload);
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
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>

        <select
          value={scId}
          onChange={(e) => setScId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
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
