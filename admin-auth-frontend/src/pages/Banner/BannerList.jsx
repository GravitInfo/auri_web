import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddEditBanner from "./AddEditBanner";
import api, { BASE_URL } from "../../utils/config";

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all banners
  const fetchBanners = async () => {
    try {
      const res = await api.get("/banners");
      setBanners(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Delete banner
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api.delete(`/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Error deleting banner:", err);
      alert("Failed to delete banner. Try again.");
    }
  };

  // ✅ Open modal for Add/Edit
  const handleAddEdit = (banner = null) => {
    setEditBanner(banner);
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Banners
        </h1>
        <button
          onClick={() => handleAddEdit(null)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#4f7be2] to-[#3d64c1] text-white px-4 py-2.5 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={18} /> Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-[#e6f5f3] text-[#155e54]">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Banner
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Deal
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {banners.length > 0 ? (
                banners.map((b) => (
                  <tr
                    key={b.bn_id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* Banner Image + Name */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      {b.pic ? (
                        <img
                          src={`${BASE_URL}/uploads/banners/${b.pic}`}
                          alt={b.bn_name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                          N/A
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {b.bn_name}
                      </span>
                    </td>

                    {/* Deal */}
                    <td className="px-6 py-4 text-gray-700">{b.deal_desc}</td>

                    {/* Description */}
                    <td className="px-6 py-4 text-gray-700 max-w-xs truncate">
                      {b.desc}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => handleAddEdit(b)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/banners/view/${b.bn_id}`)
                        }
                        className="text-green-600 hover:text-green-700 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() => handleDelete(b.bn_id)}
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
                    No banners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ModalWrapper onClose={() => setShowModal(false)}>
          <AddEditBanner
            banner={editBanner}
            onClose={() => setShowModal(false)}
            onSave={fetchBanners}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// ✅ Reusable Modal Wrapper (same as in other pages)
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
