import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  console.log("tasks", tasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      {/* <div className="bg-blue-500 h-16 flex items-center pl-4">
        <h1 className="text-xl font-bold text-white">.Trello</h1>
      </div> */}
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-14">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
