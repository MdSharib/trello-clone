import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    console.log("list task running");
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);
  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        );
      })}
    </div>
  );
};

export default ListTasks;

// for each - todo, inprogress, closed
const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  // react dnd for dropping
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  // function to change the status of tasl
  // use backend here to change status of task
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const modifiedTask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(modifiedTask));
      toast("Task Updated Successfully");
      return modifiedTask;
    });
  };

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

// each section header
const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

// for single task component
const Task = ({ task, tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateid, setUpdateId] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');



  // react dnd for initial dragging
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // use backend for deleting task
  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);

    toast("Task Removed");
  };
  
  const EditBtnHandler = (taskId) => {
    setIsEditing(!isEditing);
    setUpdateId(taskId);
  };


  // handle edit of task name
  // use backend to handle update task
  const handleEdit = () => {
    if(updatedName.length < 3 || updatedDescription.length < 3){
      return toast.error("Please enter atleast 3 characters!")
    }
    if(updatedName.length > 100 || updatedDescription.length > 100){
      return toast.error("Please enter less than 100 characters!")
    }
    const fTasks = tasks.map((t) =>{
        if(t.id === updateid){
          t.name = updatedName;
          t.description = updatedDescription;
          return t;
        }
        return t;
    } );
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Updated Successfully");
    setUpdateId("");
    setUpdatedName("");
    setUpdatedDescription("");
    setIsEditing(!isEditing);
  };
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p className="font-bold text-lg">{task.name}</p>
      <p>{task.description}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        className="absolute bottom-1 right-7 text-slate-400"
        onClick={() => EditBtnHandler(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      {/* Edit form */}
      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            className="border-2 border-slate-400 bg-slate-100 rounded-md mb-2 h-10 w-full px-1"
            placeholder="Updated Task Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            className="border-2 border-slate-400 bg-slate-100 rounded-md mb-2 h-10 w-full px-1"
            placeholder="Updated Task Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button className="bg-cyan-500 rounded-md px-4 h-10 text-white" onClick={handleEdit}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};