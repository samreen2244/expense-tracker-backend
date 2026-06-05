const express = require("express");
const cors = require("cors");
const { initializeFirebase } = require("./config/firebase");

// Firebase Initialize
initializeFirebase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/budget", require("./routes/budget"));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
