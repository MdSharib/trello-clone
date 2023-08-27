import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';






const CreateTask = ({tasks, setTasks}) => {
 const [task, setTask] =  useState({
  id: "",
  name: "",
  description: "",
  status: "todo", // status- todo, doing , done
 });



 const handleSubmit = async(e) => {
  e.preventDefault();

  if(task.name.length < 3 || task.description.length < 3){
    return toast.error("Please enter atleast 3 characters!")
  }
  if(task.name.length > 100 || task.description.length > 100){
    return toast.error("Please enter less than 100 characters!")
  }
  // try {
  //   const { tasks } = await axios.post("/api/v1/tasks/create-task", task);
  //   if (data?.errro) {
  //     toast.error(data?.error);
  //   } else {
  //     console.log("posted succesfully", tasks);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   toast.error("Something went wrong");
  // }
  

  setTasks((prev) => {
    const list = [...prev, task];
    // add backend here
    localStorage.setItem("tasks", JSON.stringify(list));
    return list;
  })
  toast.success("Task Created Successfully");
  setTask({
    id: "",
    name: "",
    description: "",
    status: "todo",
   });
 }

 console.log(task)
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center bg-white rounded-lg shadow-md p-6'>
  <input
    type='text'
    className='border-2 border-slate-400 bg-slate-100 rounded-md mb-4 h-12 w-64 px-1'
    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
    value={task.name}
    placeholder='Enter Task Name'
  />
  <input
    type='text'
    className='border-2 border-slate-400 bg-slate-100 rounded-md mb-4 h-12 w-64 px-1'
    onChange={(e) => setTask({ ...task, id: uuidv4(), description: e.target.value })}
    value={task.description}
    placeholder='Enter Task Description'
  />
  <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Create</button>
</form>


  )
}

export default CreateTask