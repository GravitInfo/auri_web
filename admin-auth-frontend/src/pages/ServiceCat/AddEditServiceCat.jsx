import React, { useState } from "react";
import axios from "axios";

export default function AddEditServiceCat({ fetchCategories, editCategory, onClose }) {
  const [name, setName] = useState(editCategory ? editCategory.sr_name : "");
  const [description, setDescription] = useState(editCategory ? editCategory.sr_s_desc : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCategory) {
        await axios.put(`http://localhost:5000/api/service-cat/${editCategory.sc_id}`, {
          sr_name: name,
          sr_s_desc: description,
        });
      } else {
        await axios.post("http://localhost:5000/api/service-cat", {
          sr_name: name,
          sr_s_desc: description,
        });
      }
      fetchCategories();
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-slide-down transition-all duration-300 pointer-events-auto">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          {editCategory ? "Edit Service Category" : "Add Service Category"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Category Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-lg">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="5"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
