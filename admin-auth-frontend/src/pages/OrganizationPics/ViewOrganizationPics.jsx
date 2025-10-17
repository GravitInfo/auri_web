import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api, { BASE_URL } from "../../utils/config";

export default function ViewOrganizationPics() {
  const { id } = useParams();
  const [pics, setPics] = useState([]);
  const navigate = useNavigate();

  const fetchPics = async () => {
    try {
      const res = await api.get(`/organization-pics/org/${id}`);
      setPics(res.data);
    } catch (error) {
      console.error("Error fetching pics:", error);
    }
  };

  useEffect(() => {
    fetchPics();
  }, [id]);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Organization {id} Pictures</h2>

      {pics.length === 0 ? (
        <p>No pictures found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pics.map((pic) => (
            <img
              key={pic.id}
              src={`${BASE_URL}/${pic.image_url}`}
              alt="org"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}
    </div>
  );
}
