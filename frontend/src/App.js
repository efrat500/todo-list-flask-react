
import './App.css';
import { useState, useEffect } from 'react';
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

function App() {
  
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data)
      }
      catch (error){
        console.error("failur in loading tasks")
      }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const [newTask, setNewTask] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!newTask.trim()) return; //if empty not send
    try{
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ content: newTask }),
      })
      setNewTask("");
      fetchTasks(); 
    }
    catch (error) {
      console.error("error in adding task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try{
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      })
      fetchTasks(); 
    }
    catch (error) {
      console.error("error in delete task:", error);
    }
  };

  const [editTask, setEditTask] = useState("");
  const [editId, setEditId] = useState(null);
  const handleUpdate = async(taskId) => {
    try{
       await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json",},
        body: JSON.stringify({ content: editTask }),
      })
      setEditTask("");  
      setEditId(null); 
      fetchTasks(); 
    }
    catch (error) {
      console.error("error in update task:", error);
    }
  };


  const toggleDone = async(taskId, currentStatus) => {
      try{
       await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers:{"Content-Type": "application/json",},
        body: JSON.stringify({ done: !currentStatus }),
      })
      fetchTasks(); 
    }
    catch (error) {
      console.error("error in done task:", error);
    }
  }

  const [filterStatus, setFilterStatus] = useState("all"); 
  const filteredTasks = tasks
    .filter((task) =>{
      if(filterStatus === "done") return task.done;
      if(filterStatus === "not_done") return !task.done
      return true; // all
  });

  return (
    <div>
      <h1>To-Do List</h1>
      
      <TaskFilter
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      />

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />

      <ol>
        {filteredTasks.map(task =>(
        <TaskItem
          key={task.id}
          task={task}
          editId={editId}
          editTask={editTask}
          setEditTask={setEditTask}
          setEditId={setEditId}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          toggleDone={toggleDone}
        />
        ))}
      </ol>
    </div>
  );
}

export default App;
