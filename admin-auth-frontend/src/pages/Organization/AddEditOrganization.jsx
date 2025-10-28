// import React, { useState } from "react";
// import api from "../../utils/config";

// export default function AddEditOrganization({ org, onClose, onSave }) {
//   const [form, setForm] = useState(
//     org || {
//       name: "",
//       email: "",
//       type: "general",
//       address: "",
//       city: "",
//       pincode: "",
//       country: "",
//       phone_no: "",
//       longitude: "",
//       latitude: "",
//       about: "",
//       password: "",
//     }
//   );

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (org) await api.put(`/organization/${org.id}`, form);
//       else await api.post("/organization", form);
//       onSave();
//       onClose();
//     } catch (err) {
//       console.error("Error saving organization:", err);
//       alert("Failed to save organization.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] p-6">
//         <h2 className="text-2xl font-bold text-[#003366] mb-6">
//           {org ? "Edit Organization" : "Add Organization"}
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Name, Email, Address */}
//           {[
//             { label: "Name", name: "name" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Address", name: "address" },
//           ].map((field) => (
//             <div key={field.name} className="flex flex-col">
//               <label className="text-gray-700 font-medium mb-1">
//                 {field.label}
//               </label>
//               <input
//                 type={field.type || "text"}
//                 name={field.name}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${field.label.toLowerCase()}`}
//                 className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
//                 required={["name", "email"].includes(field.name)}
//               />
//             </div>
//           ))}

//           {/* Type */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-medium mb-1">Type</label>
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//               required
//             >
//               <option value="">Select type</option>
//               <option value="general">General</option>
//               <option value="hospital">Hospital</option>
//             </select>
//           </div>

//           {/* City / Pincode */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//               placeholder="City"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//             <input
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//               placeholder="Pincode"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//           </div>

//           {/* Country / Phone */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="country"
//               value={form.country}
//               onChange={handleChange}
//               placeholder="Country"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//             <input
//               name="phone_no"
//               value={form.phone_no}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//           </div>

//           {/* Longitude / Latitude */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="longitude"
//               value={form.longitude}
//               onChange={handleChange}
//               placeholder="Longitude"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//             <input
//               name="latitude"
//               value={form.latitude}
//               onChange={handleChange}
//               placeholder="Latitude"
//               className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             />
//           </div>

//           {/* About */}
//           <textarea
//             name="about"
//             value={form.about}
//             onChange={handleChange}
//             placeholder="About organization"
//             rows={3}
//             className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//           ></textarea>

//           {/* Password */}
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-[#2563eb]"
//             required={!org}
//           />

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






















import React, { useState } from "react";
import api from "../../utils/config";

export default function AddEditOrganization({ org, onClose, onSave }) {
  const [form, setForm] = useState(
    org || {
      name: "",
      email: "",
      type: "general",
      address: "",
      city: "",
      pincode: "",
      country: "",
      phone_no: "",
      longitude: "",
      latitude: "",
      about: "",
      password: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (org) {
        await api.put(`/organization/${org.id}`, form);
      } else {
        await api.post("/organization", form);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving organization:", err);
      alert("Failed to save organization. Check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 pt-10 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {org ? "Edit Organization" : "Add Organization"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="general">General</option>
              <option value="hospital">Hospital</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* City & Pincode */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Pincode</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Country & Phone */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Phone No</label>
              <input
                name="phone_no"
                value={form.phone_no}
                onChange={handleChange}
                placeholder="Phone number"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Longitude & Latitude */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Longitude</label>
              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Enter longitude"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Latitude</label>
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Enter latitude"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Write something about organization"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows={3}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required={!org}
            />
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
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {org ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
