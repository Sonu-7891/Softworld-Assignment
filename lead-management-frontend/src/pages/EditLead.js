import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLead, updateLead, createLead } from "../api/leadsApi";
import { toast } from "react-toastify";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    email: "",
    contactNumber: "",
    status: "new",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchLead(id)
        .then(({ data }) => setFormData(data))
        .catch(() => toast.error("Failed to load lead details."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateLead(id, formData);
        toast.success("Lead updated successfully!");
      } else {
        await createLead(formData);
        toast.success("Lead created successfully!");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error("An error occurred while saving the lead.");
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Lead" : "Create Lead"}</h2>
      <input
        type="text"
        placeholder="Lead Name"
        value={formData.leadName}
        onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={(e) =>
          setFormData({ ...formData, contactNumber: e.target.value })
        }
        required
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="new">New</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <button type="submit">{id ? "Update Lead" : "Create Lead"}</button>
    </form>
  );
};

export default EditLead;
