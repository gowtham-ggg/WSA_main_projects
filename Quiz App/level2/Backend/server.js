require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 6000;
console.log("Initializing Server...");

app.use(express.json());
app.use(cors());

const mongodburl = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongodburl);

if (!mongodburl) {
  console.error("❌ MONGODB_URI is not set. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongodburl)
  .then(() => console.log("✅ DB Connected Successfully"))
  .catch((error) => {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  });

// Routes
require("./routes")(app);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
