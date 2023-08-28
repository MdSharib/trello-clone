import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("tasks", taskSchema);
