import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../../utils/config";

export default function OrganizationViewCustomer({ orgId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  const fetchCustomerBookings = async () => {
    try {
      const res = await api.get(`/organization/${orgId}/customers/${id}/bookings`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCustomerBookings();
  }, [id, orgId]);

  if (!user) return <p className="p-8 text-center">Loading customer...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#1b3a7a]">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#defcf7] p-3 rounded-2xl">
            <User size={32} className="text-[#1b3a7a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1b3a7a]">{user.u_name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Email:</strong> {user.user_email}</p>
          <p><strong>Phone:</strong> {user.u_mobile || "—"}</p>
          <p><strong>City:</strong> {user.city || "—"}</p>
          <p><strong>Address:</strong> {user.address || "—"}</p>
        </div>
      </div>

      {/* Customer Bookings */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.booking_dt_id} className="p-4 border rounded-lg shadow-sm">
                <p><strong>Service:</strong> {b.service_name}</p>
                <p><strong>Date:</strong> {new Date(b.p_date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ₹{b.booking_amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookings found for this customer.</p>
        )}
      </div>
    </div>
  );
}
