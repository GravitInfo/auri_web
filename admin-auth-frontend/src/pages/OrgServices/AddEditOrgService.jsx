// import React, { useEffect, useState } from "react";
// import api from "../../utils/config";

// export default function AddEditOrgService({ fetchServices, editService, onClose, orgId }) {
//   const [scId, setScId] = useState(editService ? editService.sc_id : "");
//   const [srName, setSrName] = useState(editService ? editService.sr_name : "");
//   const [srArbicName, setArbicName] = useState(editService ? editService.sr_name_ar : "");
//   const [srType, setSrType] = useState(editService ? editService.sr_type : "");
//   const [rate, setRate] = useState(editService ? editService.rate : "");
//   const [duration, setDuration] = useState(editService ? editService.duration : "");
//   const [timingFrom, setTimingFrom] = useState(editService ? editService.timing_from : "");
//   const [timingTo, setTimingTo] = useState(editService ? editService.timing_to : "");
//   const [shortDesc, setShortDesc] = useState(editService ? editService.sr_short_desc || "" : "");
//   const [longDesc, setLongDesc] = useState(editService ? editService.sr_long_desc || "" : "");
//   const [available, setAvailable] = useState(editService ? editService.available_on === "available" : true);
//   const [icon, setIcon] = useState(null);
//   const [previewIcon, setPreviewIcon] = useState(editService?.icon || null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get(`/service-cat`);
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Dropdown fetch error:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (timingFrom && timingTo) {
//       const [fromH, fromM] = timingFrom.split(":").map(Number);
//       const [toH, toM] = timingTo.split(":").map(Number);
//       let hours = toH - fromH;
//       let minutes = toM - fromM;
//       if (minutes < 0) {
//         hours -= 1;
//         minutes += 60;
//       }
//       if (hours < 0) hours += 24;
//       setDuration(`${hours}h ${minutes}m`);
//     }
//   }, [timingFrom, timingTo]);

//   const handleIconChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setIcon(file);
//       setPreviewIcon(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("orgid", orgId);
//       formData.append("sc_id", scId);
//       formData.append("sr_name", srName);
//       formData.append("sr_name_ar", srArbicName);
//       formData.append("sr_type", srType);
//       formData.append("rate", rate);
//       formData.append("duration", duration);
//       formData.append("sr_short_desc", shortDesc);
//       formData.append("sr_long_desc", longDesc);
//       formData.append("available_on", available ? "available" : "unavailable");
//       if (timingFrom) formData.append("timing_from", timingFrom);
//       if (timingTo) formData.append("timing_to", timingTo);
//       if (icon) formData.append("icon", icon);
//       else if (editService?.icon) formData.append("icon", editService.icon);

//       if (editService) {
//         await api.put(`/org-services/${editService.org_sid}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await api.post(`/org-services`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       await fetchServices();
//       onClose();
//     } catch (error) {
//       console.error("Save error:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/30 z-50 px-4 pt-10">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
//           {editService ? "Edit Service" : "Add Service"}
//         </h2>

//         {/* Availability Toggle */}
//         <div className="flex justify-end items-center gap-3 mb-4">
//           <span className="font-medium text-gray-700">{available ? "Available" : "Unavailable"}</span>
//           <div
//             onClick={() => setAvailable(!available)}
//             className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
//               available ? "bg-sky-600" : "bg-gray-400"
//             }`}
//           >
//             <div
//               className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
//                 available ? "translate-x-6" : "translate-x-1"
//               }`}
//             />
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* Category */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Category</label>
//             <select
//               value={scId}
//               onChange={(e) => {
//                 const selectedCat = categories.find((cat) => cat.sc_id == e.target.value);
//                 setScId(e.target.value);
//                 setSrType(selectedCat ? selectedCat.sr_name : "");
//               }}
//               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.sc_id} value={cat.sc_id}>
//                   {cat.sr_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* English Name */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Service Name</label>
//             <input
//               type="text"
//               placeholder="Service Name"
//               value={srName}
//               onChange={(e) => setSrName(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               required
//             />
//           </div>

//           {/* Arabic Name */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Arabic Name</label>
//             <input
//               type="text"
//               placeholder="اكتب اسم الخدمة بالعربية"
//               value={srArbicName}
//               onChange={(e) => setArbicName(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg text-right font-[Tahoma] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               required
//             />
//           </div>

//           {/* Short Description */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Short Description</label>
//             <textarea
//               placeholder="Enter short description"
//               value={shortDesc}
//               onChange={(e) => setShortDesc(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               rows="2"
//             />
//           </div>

//           {/* Long Description */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Long Description</label>
//             <textarea
//               placeholder="Enter long description"
//               value={longDesc}
//               onChange={(e) => setLongDesc(e.target.value)}
//               className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               rows="4"
//             />
//           </div>

//           {/* Rate & Duration */}
//           <div className="flex gap-4">
//             <div className="flex-1 flex flex-col">
//               <label className="text-gray-700 font-semibold mb-1">Rate</label>
//               <input
//                 type="number"
//                 placeholder="Rate"
//                 value={rate}
//                 onChange={(e) => setRate(e.target.value)}
//                 className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>
//             <div className="flex-1 flex flex-col">
//               <label className="text-gray-700 font-semibold mb-1">Duration</label>
//               <input
//                 type="text"
//                 placeholder="Duration"
//                 value={duration}
//                 readOnly
//                 className="border border-gray-300 p-3 rounded-lg bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Timing */}
//           <div className="flex flex-col">
//             <label className="text-gray-700 font-semibold mb-1">Time</label>
//             <div className="flex gap-2">
            
//               <input
//                 type="time"
//                 value={timingFrom}
//                 onChange={(e) => setTimingFrom(e.target.value)}
//                 className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               />
//               <input
//                 type="time"
//                 value={timingTo}
//                 onChange={(e) => setTimingTo(e.target.value)}
//                 className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               />
//             </div>
//           </div>

//      {/* Icon Upload */}
// <div className="flex flex-col">
//   <label className="text-gray-700 font-semibold mb-1">Service Icon</label>
//   <input
//     type="file"
//     accept="image/*"
//     onChange={handleIconChange}
//     className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//   />

//   {/* Show preview only after image is selected */}
//   {previewIcon && (
//     <div className="mt-3 flex justify-start">
//       <img
//         src={icon ? previewIcon : `${import.meta.env.VITE_BASE_URL}/uploads/icons/${previewIcon}`}
//         alt="Service Icon"
//         className="w-20 h-20 object-contain rounded-md shadow-md"
//       />
//     </div>
//   )}
// </div>




//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
//             >
//               {editService ? "Update" : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

















































































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
  const [available, setAvailable] = useState(editService ? editService.available_on === "available" : true);
  const [icon, setIcon] = useState(null);
  const [iconFileName, setIconFileName] = useState(editService?.icon || "");
  const [previewIcon, setPreviewIcon] = useState(
    editService?.icon ? `${import.meta.env.VITE_BASE_URL}/uploads/icons/${editService.icon}` : null
  );
  const [categories, setCategories] = useState([]);

  // 🟦 Fetch categories
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

  // 🕒 Auto calculate duration
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
      if (hours < 0) hours += 24;
      setDuration(`${hours}h ${minutes}m`);
    }
  }, [timingFrom, timingTo]);

  // 🟨 When category changes → auto fill icon + type
  const handleCategoryChange = (e) => {
    const selectedCat = categories.find((cat) => cat.sc_id == e.target.value);
    setScId(e.target.value);
    setSrType(selectedCat ? selectedCat.sr_name : "");

    if (selectedCat && selectedCat.icon) {
      const iconURL = `${import.meta.env.VITE_BASE_URL}/uploads/icons/${selectedCat.icon}`;
      setPreviewIcon(iconURL);
      setIcon(null);
      setIconFileName(selectedCat.icon); // save icon name for backend
    }
  };

  // 🟩 Manual file upload
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setIconFileName(""); // reset category icon name
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  // 🟦 Submit form
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

      // ✅ fix: if no new icon uploaded, use category’s icon filename
      if (icon) {
        formData.append("icon", icon);
      } else if (iconFileName) {
        formData.append("existing_icon", iconFileName);
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
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/30 z-50 px-4 pt-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {editService ? "Edit Service" : "Add Service"}
        </h2>

        {/* Availability */}
        <div className="flex justify-end items-center gap-3 mb-4">
          <span className="font-medium text-gray-700">{available ? "Available" : "Unavailable"}</span>
          <div
            onClick={() => setAvailable(!available)}
            className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
              available ? "bg-sky-600" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                available ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Category</label>
            <select
              value={scId}
              onChange={handleCategoryChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.sc_id} value={cat.sc_id}>
                  {cat.sr_name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Service Name</label>
            <input
              type="text"
              value={srName}
              onChange={(e) => setSrName(e.target.value)}
              placeholder="Service Name"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Arabic Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Arabic Name</label>
            <input
              type="text"
              value={srArbicName}
              onChange={(e) => setArbicName(e.target.value)}
              placeholder="اكتب اسم الخدمة بالعربية"
              className="border border-gray-300 p-3 rounded-lg text-right font-[Tahoma]"
              required
            />
          </div>

          {/* Descriptions */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Short Description</label>
            <textarea
              rows="2"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Long Description</label>
            <textarea
              rows="4"
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rate & Duration */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Rate</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Rate"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                readOnly
                className="border border-gray-300 p-3 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Timing */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Time</label>
            <div className="flex gap-2">
              <input
                type="time"
                value={timingFrom}
                onChange={(e) => setTimingFrom(e.target.value)}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={timingTo}
                onChange={(e) => setTimingTo(e.target.value)}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Icon */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Service Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {previewIcon && (
              <div className="mt-3 flex justify-start">
                <img
                  src={previewIcon}
                  alt="Service Icon"
                  className="w-20 h-20 object-contain rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              {editService ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

