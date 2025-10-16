import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ViewOrgService() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const fetchService = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/org-services/${id}`);
      setService(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  if (!service) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Service Details</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-2">
        <p><strong>ID:</strong> {service.org_sid}</p>
        <p><strong>Service Name:</strong> {service.sr_name}</p>
        <p><strong>Organization:</strong> {service.organization?.name}</p>
        <p><strong>Category:</strong> {service.serviceCategory?.sr_name}</p>
        <p><strong>Rate:</strong> ₹{service.rate}</p>
        <p><strong>Duration:</strong> {service.duration}</p>
      </div>
    </div>
  );
}
