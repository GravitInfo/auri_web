import React, { useState } from "react";
import api from "../../utils/config"; // ✅ updated import

export default function AddEditOrganization({ org, onClose, onSave }) {
  const [form, setForm] = useState(
    org || {
      name: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
      phone_no: "",
    }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (org) await api.put(`/organization/${org.id}`, form);
      else await api.post("/organization", form);
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving organization:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-24 z-50 bg-opacity-30">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {org ? "Edit Organization" : "Add Organization"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter organization name"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Address */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* City & Pincode */}
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Country & Phone */}
            <div className="flex gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-700 font-medium mb-1">Phone No</label>
                <input
                  name="phone_no"
                  value={form.phone_no}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
