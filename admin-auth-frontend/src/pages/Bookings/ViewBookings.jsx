// ==================== Imports ====================
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api, { BASE_URL } from "../../utils/config";
// import {
//   ArrowLeft,
//   CalendarDays,
//   Stethoscope,
// } from "lucide-react";

// // ==================== MAIN COMPONENT ====================
// export default function ViewBooking() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [bookingDetails, setBookingDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Booking Details
//   const fetchBooking = async () => {
//     try {
//       const res = await api.get(`/booking-details/${id}`);
//       setBookingDetails(Array.isArray(res.data) ? res.data : [res.data]);
//     } catch (err) {
//       console.error("❌ Error fetching booking:", err);
//       setBookingDetails([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooking();
//   }, [id]);

//   // ✅ Loading State
//   if (loading) {
//     return (
//       <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
//         Loading booking details...
//       </p>
//     );
//   }

//   // ✅ Empty State
//   if (bookingDetails.length === 0) {
//     return (
//       <p className="p-8 text-center text-red-600 text-lg font-medium">
//         Booking not found
//       </p>
//     );
//   }

//   const booking = bookingDetails[0];

//   // ==================== UI ====================
//   return (
//     <div className="bg-[#f8fdfc] min-h-screen p-6 sm:p-10 space-y-10">
//       {/* 🔙 Header / Back */}
//       <div className="flex items-center gap-3 text-[#1b3a7a]">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 hover:text-[#0d9488] transition"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>
//       </div>

//       {/* 📅 Booking Info */}
//       <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md relative overflow-hidden">
//         <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#14b8a6] to-[#0891b2] w-24 h-24 opacity-10 rounded-bl-full"></div>

//         <div className="flex items-center gap-4 mb-6">
//           <div className="bg-[#defcf7] p-3 rounded-2xl">
//             <CalendarDays size={32} className="text-[#1b3a7a]" />
//           </div>
//           <h1 className="text-3xl font-bold text-[#1b3a7a]">
//             Booking #{booking.booking_id}
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#1b3a7a]">
//           <Info label="User Name" value={booking.user_name} />
//           <Info label="Email" value={booking.user_email} />
//           <Info label="Phone" value={booking.u_mobile} />
//           <Info label="Organization" value={booking.org_name} />
//           <Info
//             label="Address"
//             value={`${booking.org_address || ""}, ${booking.org_city || ""}`}
//           />
//           <Info label="Org Email" value={booking.org_email} />
//           <Info label="Org Phone" value={booking.org_phone} />
//           <Info
//             label="Booking Date"
//             value={
//               booking.booking_date
//                 ? new Date(booking.booking_date).toLocaleDateString()
//                 : "N/A"
//             }
//           />
//           <Info
//             label="Booking Amount"
//             value={`₹${booking.booking_amount || "N/A"}`}
//           />
//         </div>
//       </div>

//       {/* 🧑‍⚕️ Services & Providers */}
//       <Section
//         title="Booked Services & Providers"
//         icon={<Stethoscope className="text-[#1b3a7a]" />}
//       >
//         {bookingDetails.length > 0 ? (
//           <div className="space-y-6">
//             {bookingDetails.map((detail) => (
//               <div
//                 key={detail.booking_dt_id}
//                 className="bg-white border border-[#cceae6] rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center gap-4"
//               >
//                 {/* 🧩 Service Info */}
//                 <div className="flex-1 text-[#1b3a7a] space-y-1">
//                   <h2 className="text-xl font-semibold">
//                     Service: {detail.service_name || "N/A"}
//                   </h2>
//                   <Info label="Rate" value={`₹${detail.service_rate || "N/A"}`} />
//                   <Info label="Duration" value={detail.duration} />
//                   <div className="flex items-center gap-2">
//                     <strong>Icon:</strong>
//                     {detail.service_icon ? (
//                       <img
//                         src={`${BASE_URL}/uploads/icons/${detail.service_icon}`}
//                         alt={detail.service_name}
//                         className="w-12 h-12 object-contain rounded-md"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Icon</span>
//                     )}
//                   </div>
//                   <Info
//                     label="Scheduled Date"
//                     value={
//                       detail.p_date
//                         ? new Date(detail.p_date).toLocaleDateString()
//                         : "N/A"
//                     }
//                   />
//                   <Info label="Scheduled Time" value={detail.p_time} />
//                 </div>

//                 {/* 👩‍⚕️ Provider Info */}
//                 <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-[#1b3a7a]">
//                   <h3 className="text-lg font-medium">
//                     Provider: {detail.provider_name || "N/A"}
//                   </h3>
//                   <Info
//                     label="Designation"
//                     value={detail.provider_designation}
//                   />
//                   {detail.provider_pic ? (
//                     <img
//                       src={`${BASE_URL}/uploads/providers/${detail.provider_pic}`}
//                       alt={detail.provider_name}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400">No Image</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No services booked.</p>
//         )}
//       </Section>
//     </div>
//   );
// }

// // ==================== REUSABLE COMPONENTS ====================

// // 📦 Reusable Info Line
// function Info({ label, value }) {
//   return (
//     <p>
//       <strong>{label}:</strong> {value || "N/A"}
//     </p>
//   );
// }

// // 🧩 Reusable Section Wrapper
// function Section({ title, icon, children }) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-3 mb-2">
//         <div className="bg-[#defcf7] p-2 rounded-xl">{icon}</div>
//         <h2 className="text-2xl font-semibold text-[#1b3a7a]">{title}</h2>
//       </div>
//       {children}
//     </div>
//   );
// }























// ==================== Imports ====================
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api, { BASE_URL } from "../../utils/config";
import { ArrowLeft, CalendarDays, Stethoscope } from "lucide-react";

// ==================== MAIN COMPONENT ====================
export default function ViewBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const previousTab = searchParams.get("tab") || "current";

  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Booking Details
  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/booking-details/${id}`);
      setBookingDetails(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error("❌ Error fetching booking:", err);
      setBookingDetails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  // ✅ Loading State
  if (loading) {
    return (
      <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
        Loading booking details...
      </p>
    );
  }

  // ✅ Empty State
  if (bookingDetails.length === 0) {
    return (
      <p className="p-8 text-center text-red-600 text-lg font-medium">
        Booking not found
      </p>
    );
  }

  const booking = bookingDetails[0];

  // ==================== UI ====================
  return (
    <div className="bg-[#f8fdfc] min-h-screen p-6 sm:p-10 space-y-10">
      {/* 🔙 Back Button */}
      <div className="flex items-center gap-3 text-[#1b3a7a]">
        <button
          onClick={() =>
            navigate(`/dashboard/bookings?tab=${previousTab}`)
          }
          className="flex items-center gap-2 hover:text-[#0d9488] transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* 1️⃣ User Info Card */}
      <InfoCard title="User Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#1b3a7a]">
          <Info label="User Name" value={booking.user_name} />
          <Info label="Email" value={booking.user_email} />
          <Info label="Phone" value={booking.u_mobile} />
        </div>
      </InfoCard>

      {/* 2️⃣ Organization Info Card */}
      <InfoCard title="Organization Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#1b3a7a]">
          <Info label="Organization" value={booking.org_name} />
          <Info
            label="Address"
            value={`${booking.org_address || ""}, ${booking.org_city || ""}`}
          />
          <Info label="Org Email" value={booking.org_email} />
          <Info label="Org Phone" value={booking.org_phone} />
          <Info
            label="Booking Date"
            value={
              booking.booking_date
                ? new Date(booking.booking_date).toLocaleDateString()
                : "N/A"
            }
          />
          <Info
            label="Booking Time"
            value={booking.p_time || "N/A"}
          />
          <Info
            label="Booking Amount"
            value={`₹${booking.booking_amount || "N/A"}`}
          />
        </div>
      </InfoCard>

      {/* 3️⃣ Services & Providers Card */}
      <InfoCard title="Booked Services & Providers" icon={<Stethoscope className="text-[#1b3a7a]" />}>
        {bookingDetails.length > 0 ? (
          <div className="space-y-6">
            {bookingDetails.map((detail) => (
              <div
                key={detail.booking_dt_id}
                className="bg-white border border-[#cceae6] rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6"
              >
                {/* Service Info */}
                <div className="flex-1 text-[#1b3a7a] space-y-2">
                  <h2 className="text-xl font-semibold">
                    Service: {detail.service_name || "N/A"}
                  </h2>
                  <Info label="Rate" value={`₹${detail.service_rate || "N/A"}`} />
                  <Info label="Duration" value={detail.duration} />
                  <div className="flex items-center gap-2">
                    <strong>Icon:</strong>
                    {detail.service_icon ? (
                      <img
                        src={`${BASE_URL}/uploads/icons/${detail.service_icon}`}
                        alt={detail.service_name}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Icon</span>
                    )}
                  </div>
                  <Info
                    label="Scheduled Date"
                    value={detail.p_date ? new Date(detail.p_date).toLocaleDateString() : "N/A"}
                  />
                  <Info label="Scheduled Time" value={detail.p_time} />
                </div>

                {/* Provider Info */}
                <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-[#1b3a7a]">
                  <h3 className="text-lg font-medium">
                    Provider: {detail.provider_name || "N/A"}
                  </h3>
                  <Info label="Designation" value={detail.provider_designation} />
                  {detail.provider_pic ? (
                    <img
                      src={`${BASE_URL}/uploads/providers/${detail.provider_pic}`}
                      alt={detail.provider_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No services booked.</p>
        )}
      </InfoCard>
    </div>
  );
}

// ==================== REUSABLE COMPONENTS ====================

// Info Card Wrapper
function InfoCard({ title, icon, children }) {
  return (
    <div className="bg-white border border-[#cceae6] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
      {icon && (
        <div className="absolute top-4 right-4 opacity-10">{icon}</div>
      )}
      <h2 className="text-2xl font-semibold text-[#1b3a7a] mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Info Line Component
function Info({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value || "N/A"}
    </p>
  );
}
