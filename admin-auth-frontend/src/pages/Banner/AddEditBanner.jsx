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
  const [status, setStatus] = useState(true); // true = active, false = inactive

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
        oldPic: banner.pic || "",
      });
      if (banner.pic) setPreview(`${BASE_URL}/uploads/banners/${banner.pic}`);
      setStatus(banner.status === "active");
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

  const handleToggleStatus = () => {
    setStatus((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      status: !status ? "active" : "inactive",
    }));
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
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/30 pt-10 px-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {banner ? "Edit Banner" : "Add Banner"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Status Toggle at top */}
          <div className="flex justify-end items-center gap-3 mb-4">
            <span className="font-medium text-gray-700">{status ? "Active" : "Inactive"}</span>
            <div
              onClick={handleToggleStatus}
              className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
                status ? "bg-sky-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  status ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>

          {/* Banner Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Banner Name</label>
            <input
              name="bn_name"
              value={formData.bn_name}
              onChange={handleChange}
              placeholder="Enter banner name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Deal Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Deal Description</label>
            <input
              name="deal_desc"
              value={formData.deal_desc}
              onChange={handleChange}
              placeholder="Enter deal description"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Colours & Link */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Colours</label>
              <input
                name="colours"
                value={formData.colours}
                onChange={handleChange}
                placeholder="Enter colours"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Link</label>
              <input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Enter link"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Banner Image */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Banner Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {preview && (
              <div className="mt-3 flex justify-start w-full">
                <img
                  src={preview}
                  alt="Banner Preview"
                  className="w-20 h-20 object-cover  shadow-md hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
            >
              {banner ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
