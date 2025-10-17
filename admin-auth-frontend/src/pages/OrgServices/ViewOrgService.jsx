import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ViewOrgService() {
  const { id } = useParams(); // org_sid
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const fetchService = async () => {
    try {
      // Use the correct backend route: GET single service by org_sid
      const res = await axios.get(`http://localhost:5000/api/org-services/${id}`);
      setService(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  if (!service) return <p className="p-6 text-gray-500">Loading service details...</p>;

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Service Details</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-3">
        <p><strong>ID:</strong> {service.org_sid}</p>
        <p><strong>Service Name:</strong> {service.sr_name}</p>
        <p><strong>Category:</strong> {service.sr_name_cat}</p>
        <p><strong>Rate:</strong> ₹{service.rate}</p>
        <p><strong>Duration:</strong> {service.duration}</p>
        <p><strong>Available On:</strong> {service.available_on}</p>
        
        {/* Icon */}
        <div className="mt-4">
          <strong>Icon:</strong>{" "}
          {service.icon ? (
            <img
              src={`http://localhost:5000/uploads/icons/${service.icon}`}
              alt={service.sr_name_cat}
              className="w-12 h-12 object-contain inline-block ml-2"
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
          ) : (
            <span className="text-gray-400 ml-2">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
