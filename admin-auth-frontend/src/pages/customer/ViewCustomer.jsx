import React, { useEffect, useState } from "react";
import { ArrowLeft, Mail, Phone, Home, User } from "lucide-react";
import api, { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔽 Customer bookings
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("current");

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (err) {
      console.log("Error fetching user", err);
    }
  };

  // 🔥 Fetch only this customer’s bookings
  const fetchCustomerBookings = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/booking-details/customer/${id}`
      );
      // res.data.bookings is the array
      setBookings(res.data.bookings || []); // ensure array
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCustomerBookings();
  }, []);

  // 🔽 Filter Booking Logic (Same as your BookingList)
  const getFilteredBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((b) => {
      const bookingDate = new Date(b.p_date);
      bookingDate.setHours(0, 0, 0, 0);

      if (activeTab === "current") return bookingDate.getTime() === today.getTime();
      if (activeTab === "upcoming") return bookingDate > today;
      if (activeTab === "past") return bookingDate < today;

      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  if (!user)
    return (
      <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
        Loading customer details...
      </p>
    );

  return (
    <div className="bg-[#f8fdfc] min-h-screen p-6 sm:p-10 space-y-10">
      {/* Back Button */}
      <div className="flex items-center gap-3 text-[#1b3a7a]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:text-[#0d9488] transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#14b8a6] to-[#0891b2] w-24 h-24 opacity-10 rounded-bl-full"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#defcf7] p-3 rounded-2xl">
            <User size={32} className="text-[#1b3a7a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1b3a7a]">
            {user.u_name || "Customer Details"}
          </h1>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#1b3a7a]">
          <div className="md:col-span-2">
            <strong>Profile Photo:</strong>
            <img
              src={
                user.profile_pic
                  ? `${BASE_URL}/uploads/profile/${user.profile_pic}`
                  : "https://i.pinimg.com/736x/82/47/0b/82470b4ed44c3edacfcd4201e2297050.jpg"
              }
              className="w-40 h-40 mt-2 rounded-xl object-cover"
            />
          </div>

          <p>
            <strong>Name:</strong> {user.u_name || "No name"}
          </p>

          <p className="flex items-center gap-2">
            <Mail className="text-[#1b3a7a]" />
            <span>
              <strong>Email:</strong> {user.user_email}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Phone className="text-[#1b3a7a]" />
            <span>
              <strong>Phone:</strong> {user.u_mobile || "—"}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Home className="text-[#1b3a7a]" />
            <span>
              <strong>Address:</strong> {user.address || "No address"}
            </span>
          </p>

          <p>
            <strong>City:</strong> {user.city || "—"}
          </p>
          <p>
            <strong>Zip:</strong> {user.zip || "—"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </p>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* CUSTOMER BOOKINGS SECTION       */}
      {/* ------------------------------ */}
      <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md mt-10">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">
          Customer Bookings
        </h2>

        {/* Tabs */}
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
        <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-[#e6f5f3] text-[#155e54]">
              <tr>
                <th className="px-6 py-3 text-left font-semibold uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase">
                  Provider
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.booking_dt_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold">{b.service_name}</p>
                      <p className="text-xs text-gray-500">₹{b.service_rate}</p>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-2">
                      {b.provider_pic && (
                        <img
                          src={`${BASE_URL}/uploads/providers/${b.provider_pic}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      {b.provider_name}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(b.p_date).toLocaleDateString()}{" "}
                      <span className="text-xs text-gray-500">
                        {b.p_time?.slice(0, 5)}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold text-[#155e54]">
                      ₹{b.booking_amount}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/bookings/${b.booking_dt_id}`)
                        }
                        className="text-green-600 hover:text-green-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No {activeTab} bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
