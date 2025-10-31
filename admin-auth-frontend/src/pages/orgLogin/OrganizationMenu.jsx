// OrganizationMenuPage.jsx
import React, { useEffect, useState } from "react";
import api, { BASE_URL } from "../../utils/config";
import { Plus, Pencil, Trash2, Images, Stethoscope, Users } from "lucide-react";

import AddEditOrganizationPic from "../OrganizationPics/AddEditOrganizationPic";
import AddEditOrgService from "../OrgServices/AddEditOrgService";
import AddEditServiceProvider from "../ServiceProviders/AddEditServiceProvider";
import AddEditOrganization from "../Organization/AddEditOrganization";

export default function OrganizationMenuPage() {
  const [orgData, setOrgData] = useState(null);

  // modals
  const [showPicModal, setShowPicModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showEditOrgModal, setShowEditOrgModal] = useState(false);

  const [editPic, setEditPic] = useState(null);
  const [editService, setEditService] = useState(null);
  const [editProvider, setEditProvider] = useState(null);

  const org = JSON.parse(localStorage.getItem("organization"));
  const orgId = org?.id;

  const fetchData = async () => {
    try {
      const res = await api.get(`/organization/${orgId}`);
      setOrgData(res.data);
    } catch (err) {
      console.error("Error loading organization:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orgId]);

  useEffect(() => {
    document.body.style.overflow =
      showPicModal || showServiceModal || showProviderModal || showEditOrgModal
        ? "hidden"
        : "auto";
  }, [showPicModal, showServiceModal, showProviderModal, showEditOrgModal]);

  if (!orgData)
    return (
      <p className="p-8 text-center text-[#1b3a7a] text-lg font-medium">
        Loading organization menu...
      </p>
    );

  const { organization, pics = [], services = [], providers = [] } = orgData;

  const handleDelete = async (endpoint, id, message, refresh) => {
    if (window.confirm(message)) {
      try {
        await api.delete(`/${endpoint}/${id}`);
        refresh();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#f8fdfc] min-h-screen p-6 sm:p-10 space-y-10">
      {/* Organization Card */}
      <div className="bg-white border border-[#cceae6] rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-bl text-[#1b3a7a] from-[#14b8a6] to-[#0891b2] w-24 h-24 opacity-10 rounded-bl-full"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#defcf7] p-3 rounded-2xl">
            <Images size={32} className="text-[#1b3a7a]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1b3a7a]">
            {organization.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#1b3a7a]">
          <p>
            <strong>Email:</strong> {organization.email}
          </p>
          <p>
            <strong>Phone:</strong> {organization.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {organization.address}
          </p>
          <p>
            <strong>City:</strong> {organization.city}
          </p>
          <p>
            <strong>Country:</strong> {organization.country}
          </p>
          <p>
            <strong>Pincode:</strong> {organization.pincode}
          </p>
          <p>
            <strong>Type:</strong> {organization.type}
          </p>
          {organization.about && (
            <p className="md:col-span-2">
              <strong>About:</strong> {organization.about}
            </p>
          )}
        </div>

        {/* Edit Organization Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowEditOrgModal(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#4f7be2] to-[#3d64c1] hover:from-[#3b5db5] hover:to-[#2d4d9a] text-white hover:opacity-90"
          >
            Edit Organization
          </button>
        </div>
      </div>

      {/* Pictures Section */}
      <HospitalSection
        title="Hospital Gallery"
        icon={<Images className="text-[#1b3a7a]" />}
        onAdd={() => {
          setEditPic(null);
          setShowPicModal(true);
        }}
      >
        {pics.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {pics.map((p) => (
              <div
                key={p.org_pic_id}
                className="group relative rounded-xl overflow-hidden border border-[#bde7e2] shadow hover:shadow-lg transition"
              >
                <img
                  src={`${BASE_URL}/uploads/orgs/${p.image}`}
                  alt="Hospital"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-[#0d9488]/10 opacity-0 group-hover:opacity-100 transition"></div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => {
                      setEditPic(p);
                      setShowPicModal(true);
                    }}
                    className="bg-white p-1 rounded-full shadow text-[#1b3a7a]"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        "organization-pics",
                        p.org_pic_id,
                        "Delete this image?",
                        fetchData
                      )
                    }
                    className="bg-white p-1 rounded-full shadow text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No gallery pictures available.</p>
        )}
      </HospitalSection>

      {/* Services Section */}
      <HospitalSection
        title="Hospital Services"
        icon={<Stethoscope className="text-[#1b3a7a]" />}
        onAdd={() => {
          setEditService(null);
          setShowServiceModal(true);
        }}
      >
        {services.length > 0 ? (
          <div className="overflow-x-auto border border-[#cceae6] rounded-xl shadow-sm text-[#1b3a7a]">
            <table className="min-w-full text-sm text-[#1b3a7a]">
              <thead className="bg-[#e6f9f6] text-[#1b3a7a]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Icon</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#defcf7]">
                {services.map((s) => (
                  <tr key={s.org_sid}>
                    <td className="px-4 py-3">{s.sr_name}</td>
                    <td className="px-4 py-3">{s.sr_type || "N/A"}</td>
                    <td className="px-4 py-3">{s.duration}</td>
                    <td className="px-4 py-3">{s.rate}</td>
                    <td className="px-4 py-3">
                      {s.icon ? (
                        <img
                          src={`${BASE_URL}/uploads/icons/${s.icon}`}
                          alt={s.sr_name}
                          className="w-10 h-10 object-contain rounded-md border border-[#bde7e2]"
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditService(s);
                          setShowServiceModal(true);
                        }}
                        className="text-[#1b3a7a] hover:text-[#0f766e]"
                      >
                        <Pencil size={16} />
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() =>
                          handleDelete(
                            "org-services",
                            s.org_sid,
                            "Delete this service?",
                            fetchData
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </HospitalSection>

      {/* Providers Section */}
      <HospitalSection
        title="Medical Staff"
        icon={<Users className="text-[#1b3a7a]" />}
        onAdd={() => {
          setEditProvider(null);
          setShowProviderModal(true);
        }}
      >
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {providers.map((p) => (
              <div
                key={p.sp_id}
                className="bg-white border border-[#cceae6] shadow-sm rounded-2xl p-5 flex items-center gap-4 relative hover:shadow-md transition"
              >
                <img
                  src={
                    p.pic
                      ? `${BASE_URL}/uploads/providers/${p.pic}`
                      : "/doc1.jpg"
                  }
                  alt={p.sp_name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#14b8a6]"
                />
                <div>
                  <p className="font-semibold text-[#1b3a7a]">{p.sp_name}</p>
                  <p className="text-[#1b3a7a]">{p.designation}</p>
                  <p className="text-sm text-[#1b3a7a]">{p.status}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditProvider(p);
                      setShowProviderModal(true);
                    }}
                    className="text-[#0d9488] hover:text-[#0f766e]"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        "service-providers",
                        p.sp_id,
                        "Delete this provider?",
                        fetchData
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No staff found.</p>
        )}
      </HospitalSection>

      {/* ==================== MODALS ==================== */}
      {showEditOrgModal && (
        <ModalWrapper onClose={() => setShowEditOrgModal(false)}>
          <AddEditOrganization
            org={organization}
            onClose={() => setShowEditOrgModal(false)}
            onSave={fetchData}
          />
        </ModalWrapper>
      )}
      {showPicModal && (
        <ModalWrapper onClose={() => setShowPicModal(false)}>
          <AddEditOrganizationPic
            fetchPics={fetchData}
            editPic={editPic}
            orgId={orgId}
            onClose={() => setShowPicModal(false)}
          />
        </ModalWrapper>
      )}
      {showServiceModal && (
        <ModalWrapper onClose={() => setShowServiceModal(false)}>
          <AddEditOrgService
            fetchServices={fetchData}
            editService={editService}
            orgId={orgId}
            onClose={() => setShowServiceModal(false)}
          />
        </ModalWrapper>
      )}
      {showProviderModal && (
        <ModalWrapper onClose={() => setShowProviderModal(false)}>
          <AddEditServiceProvider
            existingProvider={editProvider}
            orgId={orgId}
            onSuccess={() => {
              fetchData();
              setShowProviderModal(false);
            }}
            onClose={() => setShowProviderModal(false)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// ==================== SECTION COMPONENT ====================
function HospitalSection({ title, icon, onAdd, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#defcf7] p-2 rounded-xl">{icon}</div>
          <h2 className="text-2xl font-semibold text-[#1b3a7a]">{title}</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-[#4f7be2] to-[#3d64c1] hover:from-[#3b5db5] hover:to-[#2d4d9a] text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {children}
    </div>
  );
}

// ==================== MODAL WRAPPER ====================
function ModalWrapper({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[480px] max-h-[90vh] overflow-y-auto border border-[#cceae6]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
