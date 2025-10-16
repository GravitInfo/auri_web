import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewServiceProvider() {
  const { orgId, id } = useParams(); // get both orgId and provider id
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/service-providers/org/${id}`
        );
        setProvider(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProvider();
  }, [id]);

  if (!provider) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline mb-4"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-4">{provider.sp_name}</h2>
      <img
        src={`http://localhost:5000/uploads/${provider.pic}`}
        alt={provider.sp_name}
        className="h-48 w-48 object-cover rounded mb-4"
      />
      <p><strong>Designation:</strong> {provider.designation}</p>
      <p><strong>Status:</strong> {provider.status}</p>
      <p><strong>Organization ID:</strong> {provider.orgid}</p>
      <p><strong>Org Service ID:</strong> {provider.org_sid}</p>
    </div>
  );
}
