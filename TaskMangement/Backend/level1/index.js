import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TaskModel from "./model/task_model.js"


const app = express();
const port = process.env.PORT || 8000;
const mongodbUrl = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongodbUrl)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
