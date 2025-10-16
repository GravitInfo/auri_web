import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import AddEditOrganizationPic from "./AddEditOrganizationPic";

export default function OrganizationPicsList() {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPic, setEditPic] = useState(null);

  const navigate = useNavigate();

  const fetchPics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/organization-pics");
      setPics(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pics:", error);
    }
  };

  useEffect(() => {
    fetchPics();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this picture?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/organization-pics/${id}`);
      fetchPics();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Organization Pictures</h2>
        <button
          onClick={() => {
            setEditPic(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" /> Add Pics
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Preview</th>
              <th className="p-2 border">Organization ID</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pics.map((pic) => (
              <tr key={pic.id} className="text-center">
                <td className="p-2 border">{pic.org_pic_id}</td>
                <td className="p-2 border">
                  <img
                    src={`http://localhost:5000/${pic.image_url}`}
                    alt="pic"
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="p-2 border">{pic.orgid}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/dashboard/organizationPics/view/${pic.orgid}`)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditPic(pic);
                      setShowForm(true);
                    }}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pic.id)}
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
          <AddEditOrganizationPic
            fetchPics={fetchPics}
            editPic={editPic}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}
