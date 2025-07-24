
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Task from "./components/task";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const task_name = useRef();

  useEffect(() => {
    let confirmedOnce = false;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (!confirmedOnce) {
          const confirmed = window.confirm(
            "Are you sure you want to refresh? Your progress will be lost."
          );
          if (confirmed) {
            confirmedOnce = true;
            window.location.reload();
          }
        } else {
          window.location.reload();
        }}
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
     
      const logData = tasks.map(({ name, status, tags }) => ({
        name,
        status,
        tags,
      }));
      console.log("Task Snapshot:", JSON.stringify(logData, null, 2));
    }, 60000);

    return () => clearInterval(logInterval);
  }, [tasks]);

  function addTask() {
    if (task_name.current.value.trim() === "") return;
    tasks.push({
      id: Date.now(),
      name: task_name.current.value,
      status: "todo",
      tags: [],
    });
    setTasks([...tasks]);
    task_name.current.value = "";
  }
  function updateTasks() {
    setTasks([...tasks]);
  }
  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
  return (
    <section>
      <div className="container p-5">
        <div className="row">
          <div className="col-5 m-auto d-flex">
            <div className="col-9 mb-3">
              <input
                type="text"
                placeholder="Task Name"
                ref={task_name}
                className="form-control"
              />
            </div>
            <div className="col-3 mb-3">
              <button
                type="submit"
                onClick={addTask}
                className="btn btn-primary w-100"
              >
                Add
              </button>
            </div>
          </div>
          <div className="row mt-5 task-table p-0">
            <div className="col-4 table-row p-0">
              <div className="header   text-center">Todo</div>
              <div >
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task) => (
                    <div key={task.id} className="p-3">
                      <Task
                        task={task}
                        onUpdate={updateTasks}
                        onDelete={deleteTask}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-4 table-row p-0">
              <div className="header  text-center">Ongoing</div>
              <div >
                {tasks
                  .filter((task) => task.status === "ongoing")
                  .map((task) => (
                    <div key={task.id} className="p-3">
                      <Task
                        task={task}
                        onUpdate={updateTasks}
                        onDelete={deleteTask}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-4 table-row p-0">
              <div className="header   text-center">Completed</div>
              <div >
                {tasks
                  .filter((task) => task.status === "completed")
                  .map((task) => (
                    <div key={task.id} className="p-3">
                      <Task
                        task={task}
                        onUpdate={updateTasks}
                        onDelete={deleteTask}
                      />
                    </div>
                  ))}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
