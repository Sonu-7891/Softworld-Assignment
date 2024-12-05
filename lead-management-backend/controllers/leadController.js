const Lead = require("../models/Lead.model");

const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLeads = async (req, res) => {
  const { page = 1, limit = 10, search, sort, filter } = req.query;

  try {
    const query = {};
    if (search) query.leadName = new RegExp(search, "i");

    const leads = await Lead.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createLead, getLeads, updateLead, deleteLead };
