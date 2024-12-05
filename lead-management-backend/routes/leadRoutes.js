const express = require("express");
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createLead).get(protect, getLeads);
router
  .route("/:id")
  .put(protect, updateLead)
  .delete(protect, adminOnly, deleteLead);

module.exports = router;
