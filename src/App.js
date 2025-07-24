import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import Task from "./components/task";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 const [tasks, setTasks] = useState([]);

 const task_name = useRef();
function addTask(){
 tasks.push({
  name: task_name.current.value,
  status: "todo",
  tags:[]
 });
 setTasks([...tasks]);
 task_name.current.value = "";
}

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <input type="text" placeholder="Task Name" ref={task_name}  />
            <button type="submit" onClick={addTask}>Add </button>
          </div>
          <div className="row">
            <div className="col-4 table-row">
              <div className="header">Todo</div>
              <div className="table-row-content">
                {tasks.filter((task) => task.status === "todo").map((task) => (
                 <Task props={task} />
                ))}
              </div>
            </div>
            <div className="col-4 table-row">
              <div className="header">Ongoing</div>
              <div className="table-row-content"></div>
             </div>
              <div className="col-4 table-row">
                <div className="header">Completed</div>
                <div className="table-row-content"></div>
                <div></div>
              </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
