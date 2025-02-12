require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const mongodburl = process.env.MONGODBURL;

mongoose
  .connect(mongodburl)
  .then(() => console.log("DB Connected Successfully"))
  .catch((error) => console.log("DB Connection Error:", error));

// Routes
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Import and use route
const questionRoutes = require("./routes/question-routes");
app.use("/v1/questions", questionRoutes);

const startTime = Date.now();

app.listen(port, () => {
  const endTime = Date.now();
  console.log(`Server is running on port ${port}`, `Time taken: ${endTime - startTime}ms`);
});
