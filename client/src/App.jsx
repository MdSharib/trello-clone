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

  

  const fetchData = async() => {
    const res = await axios.get("/get-tasks");
    setTasks(res.data.tasks);
    console.log(res.data.tasks)
  }

  // how to make this re redner to show updated tasks
  useEffect(() => {
    console.log("app use effect called")
    // const getData = async() => {
    //   const res = await axios.get("/get-tasks");
    //   setTasks(res.data.tasks);
    //   console.log(res.data.tasks)
    // };
    // getData();
    fetchData();
  }, []);

  const callData = (text) => {
    // console.log("call data from app.js" ,text);
    fetchData();
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      {/* <div className="bg-blue-500 h-16 flex items-center pl-4">
        <h1 className="text-xl font-bold text-white">.Trello</h1>
      </div> */}
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-14">
        <CreateTask tasks={tasks} setTasks={setTasks} callData={callData}/>
        <ListTasks tasks={tasks} callData={callData} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}


export default App;
