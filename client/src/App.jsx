import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/get-tasks");
    setTasks(res.data.tasks);
    console.log(res.data.tasks);
  };

  useEffect(() => {
    console.log("app use effect called");
    fetchData();
  }, []);

  const callData = (text) => {
    // console.log("call data from app.js" ,text);
    fetchData();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="w-full h-20 bg-black flex items-center justify-center text-white shadow-md">
        <h1 className="text-3xl font-bold">.Trello</h1>
      </div>
      <div className="bg-slate-100 min-h-screen flex flex-col items-center p-3 gap-16 pt-14">
        <CreateTask tasks={tasks} setTasks={setTasks} callData={callData} />
        <ListTasks tasks={tasks} callData={callData} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
