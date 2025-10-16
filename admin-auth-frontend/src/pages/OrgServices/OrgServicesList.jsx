import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import AddEditOrgService from "./AddEditOrgService";

export default function OrgServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState(null);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/org-services");
      setServices(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching org services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/org-services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Organization Services</h2>
        <button
          onClick={() => {
            setEditService(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Service Name</th>
              <th className="p-2 border">Organization</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((srv) => (
              <tr key={srv.org_sid} className="text-center">
                <td className="p-2 border">{srv.org_sid}</td>
                <td className="p-2 border">{srv.sr_name}</td>
                <td className="p-2 border">{srv.organization?.name}</td>
                <td className="p-2 border">{srv.serviceCategory?.sr_name}</td>
                <td className="p-2 border">₹{srv.rate}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/dashboard/orgServices/${srv.org_sid}`)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditService(srv);
                      setShowForm(true);
                    }}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.org_sid)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AddEditOrgService
            fetchServices={fetchServices}
            editService={editService}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}
