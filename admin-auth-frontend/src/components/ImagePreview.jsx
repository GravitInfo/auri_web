import { useEffect, useState } from "react";
import api from "../api/api";
import { X } from "lucide-react";

export default function ImageGallery({ orgId, onClose }) {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await api.get(`/organizationPics/org/${orgId}`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [orgId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-2 right-2"><X /></button>
        <h2 className="text-xl font-bold mb-4">Organization Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
          {images.map((img) => (
            <img key={img.org_pic_id} src={`http://localhost:5000/uploads/${img.image}`} alt="org" className="rounded shadow" />
          ))}
        </div>
      </div>
    </div>
  );
}
