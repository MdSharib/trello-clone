import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks, callData }) => {
  const [task, setTask] = useState({
    taskId: "",
    name: "",
    description: "",
    status: "todo", // status- todo, doing , done
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.name.length < 3 || task.description.length < 3) {
      return toast.error("Please enter atleast 3 characters!");
    }
    if (task.name.length > 100 || task.description.length > 100) {
      return toast.error("Please enter less than 100 characters!");
    }
    try {
      const res = await axios.post("/create-task", {
        name: task.name,
        description: task.description,
        taskId: task.taskId,
        status: task.status,
      });
      if (res.data.message) {
        toast.success("Task Created Successfully");
        setTask({
          taskId: "",
          name: "",
          description: "",
          status: "todo",
        });
        callData("success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    // setTasks((prev) => {
    //   const list = [...prev, task];
    //   // add backend here
    //   localStorage.setItem("tasks", JSON.stringify(list));
    //   return list;
    // })
    // toast.success("Task Created Successfully");
    // setTask({
    //   id: "",
    //   name: "",
    //   description: "",
    //   status: "todo",
    //  });
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6"
>
  <input
    type="text"
    className="border-2 border-slate-400 bg-slate-100 rounded-md mb-4 md:mb-0 md:mr-4 h-12 w-full md:w-64 px-1"
    onChange={(e) =>
      setTask({ ...task, taskId: uuidv4(), name: e.target.value })
    }
    value={task.name}
    placeholder="Enter Task Name"
  />
  <input
    type="text"
    className="border-2 border-slate-400 bg-slate-100 rounded-md mb-4 md:mb-0 md:mr-4 h-12 w-full md:w-64 px-1"
    onChange={(e) =>
      setTask({ ...task, taskId: uuidv4(), description: e.target.value })
    }
    value={task.description}
    placeholder="Enter Task Description"
  />
  <button className="bg-cyan-500 rounded-md px-4 h-12 text-white w-full md:w-auto">
    Create
  </button>
</form>

  );
};

export default CreateTask;
