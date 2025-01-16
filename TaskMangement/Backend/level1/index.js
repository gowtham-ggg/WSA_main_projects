import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TaskModel from "./model/task_model.js";

const port = process.env.PORT || 8000;
const mongodbUrl = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Add Task Endpoint
app.post("/task", async (req, res) => {
  const { title, description, due_date } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required fields.",
    });
  }

  try {
    const task = await TaskModel.create({ title, description, due_date });
    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Tasks Endpoint
app.get("/task", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks. Please try again later.",
      error: error.message,
    });
  }
});

//update task

app.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    Object.assign(task, { title, description, due_date });
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task.",
      error: error.message,
    });
  }
});

//delete

app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete task.",
      error: error.message,
    });
  }
});

// Start Server
const httpServerStart = () => {
  const startTime = new Date();
  app.listen(port, () => {
    const endTime = new Date();
    const timeTaken = endTime - startTime;
    console.log(`Server running on port ${port}`);
    console.log(`Time taken to start server: ${timeTaken} ms`);
  });
};

httpServerStart();
