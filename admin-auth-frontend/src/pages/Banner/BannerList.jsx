import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddEditBanner from "./AddEditBanner";
import api, { BASE_URL } from "../../utils/config"; // ✅ use api from config.js

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const navigate = useNavigate();

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const res = await api.get("/banners");
      setBanners(res.data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Delete banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await api.delete(`/banners/${id}`);
        fetchBanners();
      } catch (err) {
        console.error("Error deleting banner:", err);
      }
    }
  };

  // Add/Edit
  const handleAddEdit = (banner = null) => {
    setEditBanner(banner);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Banners
        </h1>
        <button
          onClick={() => handleAddEdit(null)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Add Banner
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Deal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No banners found.
                </td>
              </tr>
            ) : (
              banners.map((b) => (
                <tr key={b.bn_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-2">
                    {b.pic ? (
                      <img
                        src={`${BASE_URL}/uploads/banners/${b.pic}`}
                        alt={b.bn_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                        N/A
                      </div>
                    )}
                    <span className="text-gray-800 font-medium">{b.bn_name}</span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{b.deal_desc}</td>
                  <td className="px-6 py-4 text-gray-600">{b.desc}</td>
                  <td className="px-6 py-4 text-gray-600">{b.status}</td>

                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleAddEdit(b)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/banners/view/${b.bn_id}`)}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(b.bn_id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddEditBanner
          banner={editBanner}
          onClose={() => setShowModal(false)}
          onSave={fetchBanners}
        />
      )}
    </div>
  );
}
