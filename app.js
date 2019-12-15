require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./api/routes/auth");
const noticeRoutes = require("./api/routes/notice");
const marksRoutes = require("./api/routes/marks");
const notesRoutes = require("./api/routes/notes");
const leavesRoutes = require("./api/routes/leaves");
const salaryRoutes = require("./api/routes/salary");
const achivementRoutes = require("./api/routes/achivement");

/**
 * database connection
 */
const config = require("./config/database");
mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * handle CORS
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/user", authRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/achivements", achivementRoutes);

/**
 * endpoint not found
 */
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
