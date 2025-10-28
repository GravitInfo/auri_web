import React, { useEffect, useState } from "react";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddEditServiceCat from "./AddEditServiceCat";
import api, { BASE_URL } from "../../utils/config";

export default function ServiceCatList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch all service categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/service-cat");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Delete a category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/service-cat/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete category. Try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Service Categories
        </h1>
        <button
          onClick={() => {
            setEditCategory(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2.5 rounded-lg hover:bg-sky-800 shadow-sm transition-all"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-[#e6f5f3] text-[#155e54]">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Icon
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr
                    key={cat.sc_id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* Icon */}
                    <td className="px-6 py-3">
                      {cat.icon ? (
                        <img
                          src={`${BASE_URL}/uploads/icons/${cat.icon}`}
                          alt={cat.sr_name}
                          className="w-10 h-10 object-contain rounded-md border border-gray-200"
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                      ) : (
                        <img
                          src="/placeholder.png"
                          alt="placeholder"
                          className="w-10 h-10 object-contain rounded-md border border-gray-200"
                        />
                      )}
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {cat.sr_name}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 text-gray-700">{cat.sr_s_desc}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditCategory(cat);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <span className="text-gray-400">|</span>

                      <button
                        onClick={() =>
                          navigate(`/dashboard/serviceCat/view/${cat.sc_id}`)
                        }
                        className="text-green-600 hover:text-green-700 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <span className="text-gray-400">|</span>

                      <button
                        onClick={() => handleDelete(cat.sc_id)}
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
                    colSpan={4}
                    className="py-8 text-center text-gray-500 italic"
                  >
                    No service categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <ModalWrapper onClose={() => setShowForm(false)}>
          <AddEditServiceCat
            fetchCategories={fetchCategories}
            editCategory={editCategory}
            onClose={() => setShowForm(false)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// ✅ Reusable Modal Wrapper (same as OrganizationList)
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
