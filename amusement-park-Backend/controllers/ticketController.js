const Ticket = require("../models/Ticket");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tickets" });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { date, type, price } = req.body;

    if (!date || !type || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTicket = await Ticket.create({ date, type, price });
    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, price } = req.body;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.date = date || ticket.date;
    ticket.type = type || ticket.type;
    ticket.price = price || ticket.price;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.destroy();
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
