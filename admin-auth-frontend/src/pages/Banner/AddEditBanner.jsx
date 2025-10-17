import { useState, useEffect } from "react";
import api, { BASE_URL } from "../../utils/config";

export default function AddEditBanner({ banner, onClose, onSave }) {
  const [formData, setFormData] = useState({
    bn_name: "",
    deal_desc: "",
    desc: "",
    colours: "",
    link: "",
    status: "active",
    pic: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (banner) {
      setFormData({
        bn_name: banner.bn_name || "",
        deal_desc: banner.deal_desc || "",
        desc: banner.desc || "",
        colours: banner.colours || "",
        link: banner.link || "",
        status: banner.status || "active",
        pic: null,
      });
      if (banner.pic) setPreview(`${BASE_URL}/uploads/banners/${banner.pic}`);
    }
  }, [banner]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((p) => ({ ...p, pic: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (banner) {
        await api.put(`/banners/${banner.bn_id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/banners", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong while saving the banner.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-24 bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {banner ? "Edit Banner" : "Add Banner"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="bn_name"
            value={formData.bn_name}
            onChange={handleChange}
            placeholder="Banner Name"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="deal_desc"
            value={formData.deal_desc}
            onChange={handleChange}
            placeholder="Deal Description"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <input
              name="colours"
              value={formData.colours}
              onChange={handleChange}
              placeholder="Colour"
              className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Link"
              className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 rounded-lg"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full max-w-[250px] h-20 object-cover rounded border mx-auto"
            />
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
