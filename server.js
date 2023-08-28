import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import taskModel from "./models/taskModel.js";
//configure env
dotenv.config();

//databse connect via config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors()); 
app.use(express.json()); 
app.use(morgan("dev")); 

//routes
app.post("/create-task", async(req, res) => {
  try {
    const { name, description, status, taskId } =
      req.body;
    

    const tasks =await new taskModel({
      name: name,
      description: description,
      status: status,
      taskId: taskId
    }).save();
    
    res.status(201).send({
      success: true,
      message: "task Created Successfully",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing task",
    });
  }
});

// get all tasks
app.get("/get-tasks", async(req, res) => {
  try {
    const tasks =await taskModel.find();
    
    res.status(201).send({
      success: true,
      message: "task fetched Successfully",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching task",
    });
  }
});

// edit tasks
app.put("/edit-tasks", async(req, res) => {
  try {
    const { name, description, status, taskId } = req.body;

    const updatedTask = await taskModel.findOneAndUpdate(
      {taskId},
      {
        name: name,
        description: description,
        status: status,
        taskId: taskId,
      },
      { new: true }
    );
    console.log("updated task ->" ,updatedTask)
    res.status(200).send({
      success: true,
      message: "task Updated SUccessfully",
      updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update task",
      error,
    });
  }
});



// change task status
app.put("/change-tasks", async (req, res) => {
  try {
    const { status, taskId } = req.body;

    // Find the task by taskId
    const task = await taskModel.findOne({ taskId });

    if (!task) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    // Update the status field
    task.status = status;
    await task.save();

    res.status(200).send({
      success: true,
      message: "Task status updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating task status",
      error,
    });
  }
});


// delete task
app.delete("/delete-task/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    const deletedTask = await taskModel.findOneAndDelete({ taskId });
    
    if (!deletedTask) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting task",
      error,
    });
  }
});



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to trello app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`.bgCyan
      .white
  );
});

