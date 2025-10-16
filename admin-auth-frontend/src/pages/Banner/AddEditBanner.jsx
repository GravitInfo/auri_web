import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Pre-fill form when editing
  useEffect(() => {
    if (banner) {
      setFormData({
        bn_name: banner.bn_name || "",
        deal_desc: banner.deal_desc || "",
        desc: banner.desc || "",
        colours: banner.colours || "",
        link: banner.link || "",
        status: banner.status || "active",
        pic: null, // file input remains empty
      });

      if (banner.pic) {
        setPreview(`http://localhost:5000/uploads/banners/${banner.pic}`);
      }
    }
  }, [banner]);

  // Handle text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, pic: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      if (banner) {
        // Edit existing banner
        await axios.put(
          `http://localhost:5000/api/banners/${banner.bn_id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Add new banner
        await axios.post("http://localhost:5000/api/banners", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSave(); // refresh banner list
      onClose(); // close modal
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Something went wrong while saving the banner.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-24 z-50 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-slide-down transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {banner ? "Edit Banner" : "Add Banner"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Banner Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Banner Name</label>
              <input
                name="bn_name"
                value={formData.bn_name}
                onChange={handleChange}
                placeholder="Banner Name"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Deal Description */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Deal Description</label>
              <input
                name="deal_desc"
                value={formData.deal_desc}
                onChange={handleChange}
                placeholder="Deal Description"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Colours & Link */}
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Colour</label>
                <input
                  name="colours"
                  value={formData.colours}
                  onChange={handleChange}
                  placeholder="Colour"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Link</label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Banner Image */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Banner Image</label>
              <input
                type="file"
                name="pic"
                onChange={handleFileChange}
                accept="image/*"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-full max-w-[250px] h-20 object-cover rounded border mx-auto"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
