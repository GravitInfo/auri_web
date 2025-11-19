import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../utils/config";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import AddEditOrganization from "./AddEditOrganization";

export default function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editOrg, setEditOrg] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch all organizations
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

  // ✅ Delete organization
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await api.delete(`/organization/${id}`);
        fetchOrganizations();
      } catch (err) {
        console.error("Error deleting organization:", err);
        alert("Failed to delete organization. Try again.");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Organizations
        </h1>
        <button
          onClick={() => {
            setEditOrg(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2.5 rounded-lg hover:bg-sky-700 shadow-sm transition-all"
        >
          <Plus size={18} /> Add Organization
        </button>
      </div>

      {/* Organization Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#e6f5f3] text-[#155e54]">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Picture
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                City
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Country
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {organizations.length > 0 ? (
              organizations.map((org) => (
                <tr
                  key={org.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  {/* IMAGE COLUMN */}
                  <td className="px-6 py-4">
                    {org.image ? (
                      <img
                        src={
                          org.image
                            ? `${BASE_URL}/${org.image}`
                            : "/placeholder.png"
                        }
                        alt={org.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {org.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{org.email}</td>
                  <td className="px-6 py-4 text-gray-700">{org.city}</td>
                  <td className="px-6 py-4 text-gray-700">{org.country}</td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditOrg(org);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <span className="text-gray-400">|</span>

                    <button
                      onClick={() =>
                        navigate(`/dashboard/organization/${org.id}`)
                      }
                      className="text-green-600 hover:text-green-700 transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <span className="text-gray-400">|</span>

                    <button
                      onClick={() => handleDelete(org.id)}
                      className="text-red-600 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500 italic"
                >
                  No organizations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <ModalWrapper onClose={() => setShowModal(false)}>
          <AddEditOrganization
            org={editOrg}
            onClose={() => setShowModal(false)}
            onSave={fetchOrganizations}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// ✅ Reusable Modal Wrapper (same as in ViewOrganization)
function ModalWrapper({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[480px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
