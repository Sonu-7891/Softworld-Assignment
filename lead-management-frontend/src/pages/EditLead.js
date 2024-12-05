import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createLead, updateLead, fetchLeads } from "../api/leadsApi";
import { toast } from "react-toastify";

const EditLead = () => {
  const { id } = useParams(); // Fetch the lead ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    contactNumber: "",
    email: "",
    address: "",
    status: "new",
    leadSource: "",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
    customerType: "individual",
    purchaseHistory: [],
    medicalNeeds: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch existing lead details for editing
      setLoading(true);
      fetchLeads(`id=${id}`)
        .then(({ data }) => setFormData(data))
        .catch(() => toast.error("Failed to load lead data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Lead" : "Create Lead"}</h2>
      <input
        type="text"
        name="leadName"
        placeholder="Lead Name"
        value={formData.leadName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="new">New</option>
        <option value="in-progress">In-Progress</option>
        <option value="closed">Closed</option>
      </select>
      <input
        type="date"
        name="nextFollowUpDate"
        value={formData.nextFollowUpDate}
        onChange={handleChange}
      />
      <input
        type="time"
        name="nextFollowUpTime"
        value={formData.nextFollowUpTime}
        onChange={handleChange}
      />
      <textarea
        name="medicalNeeds"
        placeholder="Medical Needs"
        value={formData.medicalNeeds}
        onChange={handleChange}
      />
      <button type="submit">{id ? "Update Lead" : "Create Lead"}</button>
    </form>
  );
};

export default EditLead;
