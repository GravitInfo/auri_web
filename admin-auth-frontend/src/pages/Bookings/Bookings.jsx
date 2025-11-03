// src/pages/Bookings/BookingList.jsx
import { useEffect, useState } from "react";
import api from "../../utils/config";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking-details"); // backend route: router.get("/")
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Bookings
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
              {/* <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                User ID
              </th> */}
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Service
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Provider
              </th>
              {/* <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Date / Time
              </th> */}
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
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-500 italic"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((b) => (
                <tr
                  key={b.booking_dt_id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  {/* <td className="px-6 py-4 font-medium text-gray-800">
                    {b.booking_id}
                  </td> */}
                  {/* <td className="px-6 py-4 text-gray-700">{b.user_id}</td> */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {b.service_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{b.service_rate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {b.provider_pic && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/providers/${b.provider_pic}`}
                        alt="provider"
                        className="w-8 h-8 rounded-full object-cover "
                      />
                    )}
                    <span className="text-gray-800">{b.provider_name}</span>
                  </td>
                  {/* <td className="px-6 py-4 text-gray-700">
                    {b.p_date
                      ? new Date(b.p_date).toLocaleDateString()
                      : "-"}{" "}
                    <span className="text-xs text-gray-500 ml-2">
                      {b.p_time ? b.p_time.slice(0, 5) : ""}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 font-medium text-[#155e54]">
                    ₹{b.booking_amount}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* View Button */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/bookings/${b.booking_dt_id}`)
                      }
                      className="text-green-600 hover:text-green-800 transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <span className="text-gray-400">|</span>

                    {/* Delete Button */}
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
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-500 italic"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
