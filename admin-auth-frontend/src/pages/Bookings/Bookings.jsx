import { useEffect, useState } from "react";
import api from "../../utils/config";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Load tab from URL or default to "current"
  const tabFromUrl = searchParams.get("tab") || "current";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // ✅ Whenever tab changes, update the URL query param
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking-details");
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

  // ✅ Filter bookings based on tab selection (date logic)
  const getFilteredBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((b) => {
      if (!b.p_date) return false;
      const bookingDate = new Date(b.p_date);
      bookingDate.setHours(0, 0, 0, 0);

      if (activeTab === "upcoming") return bookingDate > today;
      if (activeTab === "current") return bookingDate.getTime() === today.getTime();
      if (activeTab === "past") return bookingDate < today;
      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">Bookings</h1>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-3 mb-6 border-b border-gray-200">
        {["current", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm sm:text-base font-semibold border-b-4 transition-all duration-200 ${
              activeTab === tab
                ? "border-[#155e54] text-[#155e54]"
                : "border-transparent text-gray-500 hover:text-[#155e54]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Bookings
          </button>
        ))}
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#e6f5f3] text-[#155e54]">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Service</th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Provider</th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Date</th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Amount</th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 italic">
                  Loading bookings...
                </td>
              </tr>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.booking_dt_id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{b.service_name}</p>
                      <p className="text-xs text-gray-500">₹{b.service_rate}</p>
                    </div>
                  </td>

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

                  <td className="px-6 py-4 text-gray-700">
                    {b.p_date ? new Date(b.p_date).toLocaleDateString() : "-"}
                    <span className="text-xs text-gray-500 ml-2">
                      {b.p_time ? b.p_time.slice(0, 5) : ""}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-[#155e54]">₹{b.booking_amount}</td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/bookings/${b.booking_dt_id}?tab=${activeTab}`)
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
                <td colSpan={7} className="py-8 text-center text-gray-500 italic">
                  No {activeTab} bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

