import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import Modal from "../../components/Modal";
import AddEditServiceProvider from "./AddEditServiceProvider";
import api, { BASE_URL } from "../../utils/config";

export default function ServiceProvidersList() {
  const { orgId } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchProviders = async () => {
    try {
      const res = await api.get(`/service-providers/org/${orgId}`);
      setProviders(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [orgId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service provider?")) return;
    try {
      await api.delete(`/service-providers/${id}`);
      fetchProviders();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Service Providers</h2>
        <button
          onClick={() => {
            setSelectedProvider(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Provider
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : providers.length === 0 ? (
        <p>No service providers found.</p>
      ) : (
        <table className="w-full border shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Designation</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.sp_id}>
                <td className="p-2 border">{p.sp_id}</td>
                <td className="p-2 border">{p.sp_name}</td>
                <td className="p-2 border">{p.designation}</td>
                <td className="p-2 border">
                  <img
                    src={`${BASE_URL}/uploads/${p.pic}`}
                    alt={p.sp_name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProvider(p);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/serviceProviders/org/${orgId}/view/${p.sp_id}`
                      )
                    }
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.sp_id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddEditServiceProvider
            existingProvider={selectedProvider}
            orgId={orgId}
            onSuccess={() => {
              setShowModal(false);
              fetchProviders();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
