
import React, { useEffect, useState } from "react";
import api from "../../utils/config";

export default function AddEditOrgService({ fetchServices, editService, onClose, orgId }) {
  const [scId, setScId] = useState(editService ? editService.sc_id : "");
  const [srName, setSrName] = useState(editService ? editService.sr_name : "");
  const [srArbicName, setArbicName] = useState(editService ? editService.sr_name_ar : "");
  const [srType, setSrType] = useState(editService ? editService.sr_type : "");
  const [rate, setRate] = useState(editService ? editService.rate : "");
  const [duration, setDuration] = useState(editService ? editService.duration : "");
  const [timingFrom, setTimingFrom] = useState(editService ? editService.timing_from : "");
  const [timingTo, setTimingTo] = useState(editService ? editService.timing_to : "");
  const [shortDesc, setShortDesc] = useState(editService ? editService.sr_short_desc || "" : "");
const [longDesc, setLongDesc] = useState(editService ? editService.sr_long_desc || "" : "");
const [available, setAvailable] = useState(
  editService ? editService.available_on === "available" : true
);
  const [icon, setIcon] = useState(null);
  const [previewIcon, setPreviewIcon] = useState(editService?.icon || null);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`/service-cat`);
        setCategories(res.data);
      } catch (error) {
        console.error("Dropdown fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  // Auto-calculate duration
  useEffect(() => {
    if (timingFrom && timingTo) {
      const [fromH, fromM] = timingFrom.split(":").map(Number);
      const [toH, toM] = timingTo.split(":").map(Number);
      let hours = toH - fromH;
      let minutes = toM - fromM;
      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }
      if (hours < 0) hours += 24; // overnight
      setDuration(`${hours}h ${minutes}m`);
    }
  }, [timingFrom, timingTo]);

  // Handle icon selection
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("orgid", orgId);
      formData.append("sc_id", scId);
      formData.append("sr_name", srName);
      formData.append("sr_name_ar", srArbicName);
      formData.append("sr_type", srType);
      formData.append("rate", rate);
      formData.append("duration", duration);
      formData.append("sr_short_desc", shortDesc);
     formData.append("sr_long_desc", longDesc);
     formData.append("available_on", available ? "available" : "unavailable");

      if (timingFrom) formData.append("timing_from", timingFrom);
      if (timingTo) formData.append("timing_to", timingTo);
      if (icon) {
        formData.append("icon", icon);
      } else if (editService?.icon) {
        formData.append("icon", editService.icon);
      }

      if (editService) {
        await api.put(`/org-services/${editService.org_sid}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/org-services`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchServices();
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-xl  font-semibold mb-4">
        {editService ? "Edit Service" : "Add Service"}
      </h2>

{/* Availability Toggle */}
<div className="flex justify-start items-center gap-2 py-2">
  <span className="font-medium">
    {available ? "Available" : "Unavailable"}
  </span>
  <div
    onClick={() => setAvailable(!available)}
    className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
      available ? "bg-green-500" : "bg-gray-400"
    }`}
  >
    <div
      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
        available ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </div>
</div>

    

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Category */}
        <select
          value={scId}
          onChange={(e) => {
            const selectedCat = categories.find((cat) => cat.sc_id == e.target.value);
            setScId(e.target.value);
            setSrType(selectedCat ? selectedCat.sr_name : "");
          }}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.sc_id} value={cat.sc_id}>
              {cat.sr_name}
            </option>
          ))}
        </select>

        {/* English Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Name </label>
          <input
            type="text"
            placeholder=" Service Name"
            value={srName}
            onChange={(e) => setSrName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Arabic Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Arabic Name</label>
          <input
            type="text"
            placeholder="اكتب اسم الخدمة بالعربية"
            value={srArbicName}
            onChange={(e) => setArbicName(e.target.value)}
            
            className="w-full border px-3 py-2 rounded text-right font-[Tahoma]"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <textarea
            placeholder="Enter short description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="2"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Long Description</label>
          <textarea
            placeholder="Enter long description"
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        {/* Rate */}
          <label className="block text-sm font-medium mb-1">Rate</label>
        <input
       
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Duration */}
          <label className="block text-sm font-medium mb-1">Duration</label>
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />

        {/* Timing */}
            <label className="block text-sm font-medium mb-1">Time</label>
        <div className="flex gap-2">
        
          <input
            type="time"
            value={timingFrom}
            onChange={(e) => setTimingFrom(e.target.value)}
            className="w-1/2 border px-3 py-2 rounded"
          />
          <input
            type="time"
            value={timingTo}
            onChange={(e) => setTimingTo(e.target.value)}
            className="w-1/2 border px-3 py-2 rounded"
          />
        </div>

        

        {/* Icon Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Icon</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            className="w-full border px-3 py-2 rounded"
          />
          {previewIcon && (
            <img
              src={
                icon
                  ? previewIcon
                  : `${import.meta.env.VITE_BASE_URL}/uploads/icons/${previewIcon}`
              }
              alt="Service Icon"
              className="w-16 h-16 mt-2 object-contain rounded-md"
            />
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}



