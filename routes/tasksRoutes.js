import express from "express";
import {
  createTaskController,
  // getTaskController,
  // updateTaskController,
  // deleteTaskController
} from "../controllers/tasksController.js";


const router = express.Router();

//routes
router.post(
  "/create-task",
  createTaskController
);

// //routes
// router.put(
//   "/update-task/:tid",
//   updateTaskController
// );

// //get products
// router.get("/get-product", getTaskController);

// //delete rproduct
// router.delete("/delete-product/:pid", deleteTaskController);

export default router;

