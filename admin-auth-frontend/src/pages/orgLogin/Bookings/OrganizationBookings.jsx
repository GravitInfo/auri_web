// src/pages/orgLogin/Bookings/OrganizationBookings.jsx
import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/config";

export default function OrganizationBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get orgId from localStorage
  const orgData = JSON.parse(localStorage.getItem("organization"));
  const orgId = orgData?.id;

  // ✅ Fetch bookings for this organization
  const fetchBookings = async () => {
    if (!orgId) return;
    setLoading(true);
    try {
      const res = await api.get(`/booking-details/org/${orgId}`);
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching organization bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [orgId]);

  // ✅ Delete booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await api.delete(`/booking-details/${id}`);
        fetchBookings();
      } catch (err) {
        console.error("❌ Error deleting booking:", err);
        alert("Failed to delete booking. Try again.");
      }
    }
  };

  if (!orgId) {
    return (
      <div className="p-4 text-center text-red-600">
        Organization not logged in.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Organization Bookings
        </h1>
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#e6f5f3] text-[#155e54]">
            <tr>
              {/* <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Booking ID
              </th> */}
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Service
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Provider
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 italic">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((b) => (
                <tr
                  key={b.booking_dt_id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  {/* <td className="px-6 py-4 font-medium text-gray-800">{b.booking_id}</td> */}

                  {/* Service */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* {b.service_icon && (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/uploads/services/${b.service_icon}`}
                          alt="service"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )} */}
                      <div>
                        <p className="font-semibold text-gray-800">{b.service_name}</p>
                        <p className="text-xs text-gray-500">₹{b.service_rate}</p>
                      </div>
                    </div>
                  </td>

                  {/* Provider */}
                  <td className="px-6 py-4 flex items-center gap-2">
                    {b.provider_pic && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/providers/${b.provider_pic}`}
                        alt="provider"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-gray-800">{b.provider_name}</span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-medium text-[#155e54]">
                    ₹{b.booking_amount}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/organization/bookings/${b.booking_dt_id}`)
                      }
                      className="text-green-600 hover:text-green-800 transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      onClick={() => handleDelete(b.booking_dt_id)}
                      className="text-red-600 hover:text-red-700 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 italic">
                  No bookings found for this organization.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
