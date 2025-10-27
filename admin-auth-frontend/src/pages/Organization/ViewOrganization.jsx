// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api, { BASE_URL } from "../../utils/config";
// import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
// import AddEditOrganizationPic from "../OrganizationPics/AddEditOrganizationPic";
// import AddEditOrgService from "../OrgServices/AddEditOrgService";
// import AddEditServiceProvider from "../ServiceProviders/AddEditServiceProvider";

// export default function ViewOrganization() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [orgData, setOrgData] = useState(null);
//   const [showPicModal, setShowPicModal] = useState(false);
//   const [showServiceModal, setShowServiceModal] = useState(false);
//   const [showProviderModal, setShowProviderModal] = useState(false);
//   const [editPic, setEditPic] = useState(null);
//   const [editService, setEditService] = useState(null);
//   const [editProvider, setEditProvider] = useState(null);

//   // ✅ Fetch organization details
//   const fetchData = async () => {
//     try {
//       const res = await api.get(`/organization/${id}`);
//       setOrgData(res.data);
//     } catch (err) {
//       console.error("Error loading organization:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   // 🔹 Lock background scroll when any modal is open
//   useEffect(() => {
//     if (showPicModal || showServiceModal || showProviderModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [showPicModal, showServiceModal, showProviderModal]);

//   if (!orgData)
//     return (
//       <p className="p-6 text-gray-500 text-center text-lg">
//         Loading organization details...
//       </p>
//     );

//   const { organization, pics = [], services = [], providers = [] } = orgData;



//   const handleDeleteService = async (serviceId) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       try {
//         await api.delete(`/org-services/${serviceId}`);
//         fetchData(); // Refresh table after delete
//       } catch (err) {
//         console.error("Delete service error:", err);
//         alert("Failed to delete service. Try again.");
//       }
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 space-y-10 bg-gray-50 min-h-screen relative">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-blue-600 hover:underline mb-4 sm:mb-6"
//       >
//         <ArrowLeft size={16} /> Back
//       </button>

//       {/*  Organization Info */}
//       <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
//           {organization.name}
//         </h1>
//         <div className="space-y-2 text-sm sm:text-base">
//           <p>
//             <strong>Email:</strong> {organization.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {organization.phone_no}
//           </p>
//           <p>
//             <strong>Address:</strong> {organization.address}, {organization.city},{" "}
//             {organization.country}
//           </p>
//           <p>
//             <strong>Pincode:</strong> {organization.pincode}
//           </p>
//           {organization.about && (
//             <p>
//               <strong>About:</strong> {organization.about}
//             </p>
//           )}
//         </div>
//       </div>

//       {/*  Pictures Section */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl sm:text-2xl font-semibold">Pictures</h2>
//           <button
//             onClick={() => {
//               setEditPic(null);
//               setShowPicModal(true);
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//           >
//             <Plus size={16} /> Add Picture
//           </button>
//         </div>

//         {pics.filter((p) => p.image && p.image.trim() !== "").length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {pics
//               .filter((p) => p.image && p.image.trim() !== "")
//               .map((p) => (
                
//                   <div key={p.org_pic_id} className="relative group">
//   <img
//     src={`${BASE_URL}/uploads/orgs/${p.image}`}
//     alt="Organization"
//     className="w-full h-52 object-cover rounded-lg shadow-sm"
//   />

//   {/* Edit Button - hidden until hover */}
//   <button
//     onClick={() => {
//       setEditPic(p);
//       setShowPicModal(true);
//     }}
//     className="absolute top-2 right-10 text-blue-800 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:text-blue-900 transition-opacity duration-200"
//   >
//     <Pencil size={14} />
//   </button>
// <span className="text-gray-300">|</span>

//                   {/* delete */}
//                    <button
//             onClick={async () => {
//                 if (window.confirm("Are you sure you want to delete this picture?")) {
//                   try {
//                     await api.delete(`/organization-pics/${p.org_pic_id}`);
//                     fetchData(); // Refresh pictures after deletion
//                   } catch (err) {
//                     console.error("Delete picture error:", err);
//                     alert("Failed to delete picture. Try again.");
//                   }
//                 }
//               }}
//               className="absolute top-2 right-2 text-red-500  p-1 rounded-full opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity duration-200"
//             >
//                <Trash2 size={14} />
//             </button> 
//                 </div>
//               ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No pictures available.</p>
//         )}
//       </div>

//       {/*  Services Section */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl sm:text-2xl font-semibold">Services</h2>
//           <button
//             onClick={() => {
//               setEditService(null);
//               setShowServiceModal(true);
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//           >
//             <Plus size={16} /> Add Service
//           </button>
//         </div>

//         {services.length > 0 ? (
//           <div className="overflow-x-auto rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left font-semibold">Name</th>
//                   <th className="px-4 py-3 text-left font-semibold">Type</th>
//                   <th className="px-4 py-3 text-left font-semibold">Duration</th>
//                   <th className="px-4 py-3 text-left font-semibold">Rate</th>
//                   <th className="px-4 py-3 text-left font-semibold">Icon</th>
//                   <th className="px-4 py-3 text-left font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {services.map((s) => (
//                   <tr key={s.org_sid}>
//                     <td className="px-4 py-3">{s.sr_name}</td>
//                     <td className="px-4 py-3">{s.sr_type || s.sr_name_cat || "N/A"}</td>
//                     <td className="px-4 py-3">{s.duration}</td>
//                     <td className="px-4 py-3">{s.rate}</td>
//                     <td className="px-4 sm:px-6 py-3">
//                       {s.icon ? (
//                         <img
//                           src={`${BASE_URL}/uploads/icons/${s.icon}`}
//                           alt={s.sr_name}
//                           className="w-12 h-12 object-contain rounded-md shadow-sm"
//                           onError={(e) => (e.target.src = "/placeholder.png")}
//                         />
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 flex gap-2">
//                       <button
//                         onClick={() => {
//                           setEditService(s);
//                           setShowServiceModal(true);
//                         }}
//                         className="text-blue-800 hover:text-blue-900"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <span className="text-gray-300">|</span>
//                       <button
//                         onClick={() => handleDeleteService(s.org_sid)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500">No services available.</p>
//         )}
//       </div>

//       {/*  Providers Section */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl sm:text-2xl font-semibold">Service Providers</h2>
//           <button
//             onClick={() => {
//               setEditProvider(null);
//               setShowProviderModal(true);
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//           >
//             <Plus size={16} /> Add Provider
//           </button>
//         </div>

//       {providers.length > 0 ? (
//   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//     {providers.map((p) => (
//       <div
//         key={p.sp_id}
//         className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative"
//       >
//         <img
//           src={p.pic ? `${BASE_URL}/uploads/providers/${p.pic}` : "/doc1.jpg"}
//           alt={p.sp_name}
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-semibold text-gray-800">{p.sp_name}</p>
//           <p className="text-gray-600">{p.designation}</p>
//           <p className="text-sm text-gray-500">{p.status}</p>
//         </div>

//         {/* Edit Button */}
//         <button
//           onClick={() => {
//             setEditProvider(p);
//             setShowProviderModal(true);
//           }}
//           className="absolute top-2 right-10 text-blue-800 p-1 rounded-full hover:text-blue-900"
//         >
//           <Pencil size={14} />
//         </button>

//         {/* Delete Button */}
//         <button
//           onClick={async () => {
//             if (window.confirm("Are you sure you want to delete this provider?")) {
//               try {
//                 await api.delete(`/service-providers/${p.sp_id}`);
//                 fetchData();
//               } catch (err) {
//                 console.error("Delete provider error:", err);
//                 alert("Failed to delete provider. Try again.");
//               }
//             }
//           }}
//           className="absolute top-2 right-2 text-red-500  p-1 rounded-full hover:text-red-600"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>
//     ))}
//   </div>
// ) : (
//   <p className="text-gray-500">No providers available.</p>
// )}
// </div>


//       {/* Modals */}
//       {showPicModal && (
//         <div
//           className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
//           onClick={() => setShowPicModal(false)}
//         >
//           <div
//             className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[450px] max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <AddEditOrganizationPic
//               fetchPics={fetchData}
//               editPic={editPic}
//               orgId={id}
//               onClose={() => setShowPicModal(false)}
//             />
//           </div>
//         </div>
//       )}

//       {showServiceModal && (
//         <div
//           className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
//           onClick={() => setShowServiceModal(false)}
//         >
//           <div
//             className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[500px] max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <AddEditOrgService
//               fetchServices={fetchData}
//               editService={editService}
//               orgId={id}
//               onClose={() => setShowServiceModal(false)}
//             />
//           </div>
//         </div>
//       )}

//       {showProviderModal && (
//         <div
//           className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
//           onClick={() => setShowProviderModal(false)}
//         >
//           <div
//             className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[480px] max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <AddEditServiceProvider
//               existingProvider={editProvider}
//               orgId={id}
              
//               onSuccess={() => {
//                 fetchData();
//                 setShowProviderModal(false);
//               }}
//               onClose={() => setShowProviderModal(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Add animation (optional) */
// const style = document.createElement("style");
// style.innerHTML = `
// @keyframes fadeIn {
//   from { opacity: 0; transform: scale(0.97); }
//   to { opacity: 1; transform: scale(1); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.2s ease-out;
// }
// `;
// document.head.appendChild(style);



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../utils/config";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import AddEditOrganizationPic from "../OrganizationPics/AddEditOrganizationPic";
import AddEditOrgService from "../OrgServices/AddEditOrgService";
import AddEditServiceProvider from "../ServiceProviders/AddEditServiceProvider";

export default function ViewOrganization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState(null);
  const [showPicModal, setShowPicModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [editPic, setEditPic] = useState(null);
  const [editService, setEditService] = useState(null);
  const [editProvider, setEditProvider] = useState(null);

  // ✅ Fetch organization details
  const fetchData = async () => {
    try {
      const res = await api.get(`/organization/${id}`);
      setOrgData(res.data);
    } catch (err) {
      console.error("Error loading organization:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // 🔹 Lock background scroll when any modal is open
  useEffect(() => {
    if (showPicModal || showServiceModal || showProviderModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPicModal, showServiceModal, showProviderModal]);

  if (!orgData)
    return (
      <p className="p-6 text-gray-500 text-center text-lg">
        Loading organization details...
      </p>
    );

  const { organization, pics = [], services = [], providers = [] } = orgData;

  const handleDeletePic = async (picId) => {
    if (window.confirm("Are you sure you want to delete this picture?")) {
      try {
        await api.delete(`/organization-pics/${picId}`);
        fetchData(); // Refresh the pictures after deletion
      } catch (err) {
        console.error("Delete picture error:", err);
        alert("Failed to delete picture. Try again.");
      }
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.delete(`/org-services/${serviceId}`);
        fetchData(); // Refresh table after delete
      } catch (err) {
        console.error("Delete service error:", err);
        alert("Failed to delete service. Try again.");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-10 bg-gray-50 min-h-screen relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4 sm:mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/*  Organization Info */}
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {organization.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
          <p>
            <strong>Email:</strong> {organization.email}
          </p>
          <p>
            <strong>Phone:</strong> {organization.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {organization.address}
          </p>
          <p>
            <strong>City:</strong> {organization.city}
          </p>
          <p>
            <strong>Country:</strong> {organization.country}
          </p>
          <p>
            <strong>Pincode:</strong> {organization.pincode}
          </p>
          <p>
            <strong>Type:</strong> {organization.type}
          </p>
          {organization.latitude && (
            <p>
              <strong>Latitude:</strong> {organization.latitude}
            </p>
          )}
          {organization.longitude && (
            <p>
              <strong>Longitude:</strong> {organization.longitude}
            </p>
          )}
          {organization.about && (
            <p className="sm:col-span-2">
              <strong>About:</strong> {organization.about}
            </p>
          )}
          {/*  Password hidden intentionally */}
        </div>
      </div>

      {/*  Pictures Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Pictures</h2>
          <button
            onClick={() => {
              setEditPic(null);
              setShowPicModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <Plus size={16} /> Add Picture
          </button>
        </div>

        {pics.filter((p) => p.image && p.image.trim() !== "").length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pics
              .filter((p) => p.image && p.image.trim() !== "")
              .map((p) => (
                <div key={p.org_pic_id} className="relative group">
                  <img
                    src={`${BASE_URL}/uploads/orgs/${p.image}`}
                    alt="Organization"
                    className="w-full h-52 object-cover rounded-lg shadow-sm"
                  />
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setEditPic(p);
                      setShowPicModal(true);
                    }}
                    className="absolute top-2 right-10 text-blue-800 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:text-blue-900 transition-opacity duration-200"
                  >
                    <Pencil size={14} />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => handleDeletePic(p.org_pic_id)}
                    className="absolute top-2 right-2 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity duration-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No pictures available.</p>
        )}
      </div>

      {/*  Services Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Services</h2>
          <button
            onClick={() => {
              setEditService(null);
              setShowServiceModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <Plus size={16} /> Add Service
          </button>
        </div>

        {services.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Icon</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((s) => (
                  <tr key={s.org_sid}>
                    <td className="px-4 py-3">{s.sr_name}</td>
                    <td className="px-4 py-3">
                      {s.sr_type || s.sr_name_cat || "N/A"}
                    </td>
                    <td className="px-4 py-3">{s.duration}</td>
                    <td className="px-4 py-3">{s.rate}</td>
                    <td className="px-4 sm:px-6 py-3">
                      {s.icon ? (
                        <img
                          src={`${BASE_URL}/uploads/icons/${s.icon}`}
                          alt={s.sr_name}
                          className="w-12 h-12 object-contain rounded-md shadow-sm"
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditService(s);
                          setShowServiceModal(true);
                        }}
                        className="text-blue-800 hover:text-blue-900"
                      >
                        <Pencil size={16} />
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDeleteService(s.org_sid)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </div>

      {/* Providers Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Service Providers
          </h2>
          <button
            onClick={() => {
              setEditProvider(null);
              setShowProviderModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            <Plus size={16} /> Add Provider
          </button>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {providers.map((p) => (
              <div
                key={p.sp_id}
                className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative"
              >
                <img
                  src={
                    p.pic
                      ? `${BASE_URL}/uploads/providers/${p.pic}`
                      : "/doc1.jpg"
                  }
                  alt={p.sp_name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{p.sp_name}</p>
                  <p className="text-gray-600">{p.designation}</p>
                  <p className="text-sm text-gray-500">{p.status}</p>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditProvider(p);
                    setShowProviderModal(true);
                  }}
                  className="absolute top-2 right-10 text-blue-800 p-1 rounded-full hover:text-blue-900"
                >
                  <Pencil size={14} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this provider?"
                      )
                    ) {
                      try {
                        await api.delete(`/service-providers/${p.sp_id}`);
                        fetchData();
                      } catch (err) {
                        console.error("Delete provider error:", err);
                        alert("Failed to delete provider. Try again.");
                      }
                    }
                  }}
                  className="absolute top-2 right-2 text-red-500  p-1 rounded-full hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No providers available.</p>
        )}
      </div>

      {/* Modals */}
      {showPicModal && (
        <ModalWrapper onClose={() => setShowPicModal(false)}>
          <AddEditOrganizationPic
            fetchPics={fetchData}
            editPic={editPic}
            orgId={id}
            onClose={() => setShowPicModal(false)}
          />
        </ModalWrapper>
      )}

      {showServiceModal && (
        <ModalWrapper onClose={() => setShowServiceModal(false)}>
          <AddEditOrgService
            fetchServices={fetchData}
            editService={editService}
            orgId={id}
            onClose={() => setShowServiceModal(false)}
          />
        </ModalWrapper>
      )}

      {showProviderModal && (
        <ModalWrapper onClose={() => setShowProviderModal(false)}>
          <AddEditServiceProvider
            existingProvider={editProvider}
            orgId={id}
            onSuccess={() => {
              fetchData();
              setShowProviderModal(false);
            }}
            onClose={() => setShowProviderModal(false)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// 🔹 Reusable Modal Wrapper
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
