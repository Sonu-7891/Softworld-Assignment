const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  status: {
    type: String,
    enum: ["new", "in-progress", "closed"],
    default: "new",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nextFollowUpDate: { type: Date },
  nextFollowUpTime: { type: String },
  leadSource: { type: String },
  conversionDate: { type: Date },
  leadNotes: { type: String },
  customerType: {
    type: String,
    enum: ["individual", "corporate"],
    default: "individual",
  },
  purchaseHistory: [{ item: String, quantity: Number, date: Date }],
  medicalNeeds: { type: String },
});

module.exports = mongoose.model("Lead", LeadSchema);
