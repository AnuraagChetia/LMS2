const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/database");
const morgan = require("morgan");
const fs = require("fs");
const helmet = require("helmet");
require("dotenv").config();

//routes
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));
app.use("/user", userRoutes);
app.use("/teacher", teacherRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
// Define a route handler for the root ("/") route
app.get("/", (req, res) => {
  const defaultMessage = "Connected to Backend!";

  // Send the default message as the response
  res.send(defaultMessage);
});

app.listen(3000, () => {
  connectDB();
  console.log("listening to port 3000");
});
