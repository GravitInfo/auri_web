import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { ArrowLeft } from "lucide-react";

export default function ViewOrganization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/organization/${id}`);
        setOrgData(res.data);
      } catch (err) {
        console.error("Error loading organization:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!orgData)
    return (
      <p className="p-6 text-gray-500 text-center text-lg">
        Loading organization details...
      </p>
    );

  const { organization, pics = [], services = [], providers = [] } = orgData;

  return (
    <div className="p-4 sm:p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-4 sm:mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Organization Info */}
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {organization.name}
        </h1>
        <div className="space-y-2 text-sm sm:text-base">
          <p className="text-gray-700 break-words">
            <span className="font-semibold">Email:</span> {organization.email}
          </p>
          <p className="text-gray-700 break-words">
            <span className="font-semibold">Phone:</span>{" "}
            {organization.phone_no}
          </p>
          <p className="text-gray-700 break-words">
            <span className="font-semibold">Address:</span>{" "}
            {organization.address}, {organization.city}, {organization.country}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Pincode:</span>{" "}
            {organization.pincode}
          </p>
          {organization.about && (
            <p className="text-gray-700 break-words">
              <span className="font-semibold">About:</span> {organization.about}
            </p>
          )}
        </div>
      </div>

      {/* Pictures */}
      {pics.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Pictures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pics.map((p) => (
              <img
                key={p.org_pic_id}
                src={`http://localhost:5000/uploads/orgs/${p.image}`}
                alt="Org"
                className="w-full h-52 sm:h-48 object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      {services.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Services
          </h2>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Duration
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Rate
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                    Icon
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((s) => {
                  console.log("Service Icon Path:", s.icon);
                  return (
                    <tr key={s.org_sid} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                        {s.sr_name}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                        {s.sr_type}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                        {s.duration}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                        {s.rate}
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-left whitespace-nowrap">
                        {s.icon ? (
                          <img
                            src={`http://localhost:5000/uploads/icons/${s.icon}`}
                            alt={s.sr_name}
                            className="w-12 h-12 object-contain rounded-md shadow-sm" // increased size and added slight rounding
                            onError={(e) => (e.target.src = "/placeholder.png")}
                          />
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Providers */}
      {providers.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Service Providers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {providers.map((p) => (
              <div
                key={p.sp_id}
                className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 text-center sm:text-left"
              >
                <img
                  src={
                    p.pic
                      ? `http://localhost:5000/uploads/providers/${p.pic}`
                      : "/doc1.jpg"
                  }
                  alt={p.sp_name}
                  className="w-20 h-20 rounded-full object-cover mb-3 sm:mb-0"
                />
                <div>
                  <p className="font-semibold text-gray-800">{p.sp_name}</p>
                  <p className="text-gray-600">{p.designation}</p>
                  <p className="text-sm text-gray-500">{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
