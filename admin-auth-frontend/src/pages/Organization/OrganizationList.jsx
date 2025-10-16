import { useEffect, useState } from "react";
import api from "../../utils/api";
import AddEditOrganization from "./AddEditOrganization";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

export default function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editOrg, setEditOrg] = useState(null);
  const navigate = useNavigate();

  const fetchOrganizations = async () => {
    try {
      const res = await api.get("/organization");
      setOrganizations(res.data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await api.delete(`/organization/${id}`);
        fetchOrganizations();
      } catch (err) {
        console.error("Error deleting organization:", err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">Organizations</h1>
        <button
          onClick={() => { setEditOrg(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus size={16}/> Add Organization
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {organizations.map((org) => (
              <tr key={org.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-medium">{org.name}</td>
                <td className="px-6 py-4 text-gray-600">{org.email}</td>
                <td className="px-6 py-4 text-gray-600">{org.city}</td>
                <td className="px-6 py-4 text-gray-600">{org.country}</td>
                <td className="px-6 py-4 flex justify-center gap-4">

                  <button
                    onClick={() => { setEditOrg(org); setShowModal(true); }}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Pencil size={18}/>
                  </button>

                   <button
                    onClick={() => navigate(`/dashboard/organization/${org.id}`)}
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <Eye size={18}/>
                  </button>

                  <button
                    onClick={() => handleDelete(org.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))}
            {organizations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddEditOrganization
          org={editOrg}
          onClose={() => setShowModal(false)}
          onSave={fetchOrganizations}
        />
      )}
    </div>
  );
}
