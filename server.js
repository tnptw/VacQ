const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");
const appointments = require("./routes/appointments");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

const PORT = process.env.PORT || 5001;
const server = app.listen(
  PORT,
  console.log(
    "Server running in",
    process.env.NODE_ENV,
    "on http://localhost:" + PORT
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
