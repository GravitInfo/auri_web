import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api, { BASE_URL } from "../../../utils/config";
import axios from "axios";

export default function OrganizationCustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { orgId } = useParams();

const fetchCustomers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/organization/${orgId}/customers`);
    setCustomers(data); // data is an array of users
  } catch (err) {
    console.error("Error fetching customers", err);
  }
};

  useEffect(() => {
    if (!orgId) return;
    fetchCustomers();
  }, [orgId]);

  const filtered = customers.filter(
    (c) =>
      c.u_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.user_email?.toLowerCase().includes(search.toLowerCase()) ||
      c.u_mobile?.includes(search)
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#003366]">
          Customers
        </h1>
      </div>

      <div className="flex items-center gap-3 bg-white border-gray-950 rounded-xl p-3 shadow-sm mb-6">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, mobile..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#e6f5f3] text-[#155e54]">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Profile
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Mobile
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.user_id} className="hover:bg-gray-50 transition-all duration-200">
                <td className="px-6 py-4">
                  <img
                    src={
                      c.profile_pic
                        ? `${BASE_URL}/uploads/profile/${c.profile_pic}`
                        : "https://i.pinimg.com/736x/82/47/0b/82470b4ed44c3edacfcd4201e2297050.jpg"
                    }
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{c.u_name || "—"}</td>
                <td className="px-6 py-4 text-gray-700">{c.user_email}</td>
                <td className="px-6 py-4 text-gray-700">{c.u_mobile || "—"}</td>
                <td className="px-10 py-4">
                  <button
                    onClick={() => navigate(`/org/customers/${c.user_id}`)}
                    className="text-green-600 hover:text-green-700 transition"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500 italic">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
