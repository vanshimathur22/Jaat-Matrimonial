const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5050;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb+srv://vanshimathur22:ASDFghJKL90()@jaatmatrimonial-cluster.dzdqpam.mongodb.net/?retryWrites=true&w=majority&appName=JaatMatrimonial-cluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
const profileRoutes = require("./routes/profiles");
app.use("/profiles", profileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
