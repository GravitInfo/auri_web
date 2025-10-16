import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddEditServiceCat from "./AddEditServiceCat";

export default function ServiceCatList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/service-cat");
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/service-cat/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Service Categories
        </h2>
        <button
          onClick={() => {
            setEditCategory(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.sc_id} className="hover:bg-gray-50 transition text-center">
                  <td className="px-6 py-4 text-gray-800 font-medium">{cat.sc_id}</td>
                  <td className="px-6 py-4 text-gray-700">{cat.sr_name}</td>
                  <td className="px-6 py-4 text-gray-600">{cat.sr_s_desc}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => { setEditCategory(cat); setShowForm(true); }}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/serviceCat/view/${cat.sc_id}`)}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.sc_id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-gray-500">
                    No service categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Centered Smooth Popup */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <AddEditServiceCat
              fetchCategories={fetchCategories}
              editCategory={editCategory}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
