const express = require("express");
const {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllTickets);

router.post("/", authMiddleware, createTicket);
router.put("/:id", authMiddleware, updateTicket);
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;
