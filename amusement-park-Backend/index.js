// index.js
const express = require("express");
const sequelize = require("./config/database");
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server after syncing the database
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false }) // Set to true to reset DB on every start
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Error syncing database:", err));
