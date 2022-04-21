/*import './App.css';
import Header from './component/Header';
import { Tasks } from './component/Tasks';
import { useState } from "react"
import { AddTask } from './component/AddTask';
function App() {
const [showAddTask, setShowAddTask] = useState(false);
 const [tasks, setTasks] = useState([{
 id: 1,
 text: 'Doctors Appointment',
 day: 'Feb 5th at 2:30pm',
 reminder: true,
 },
 {
 id: 2,
 text: 'Meeting at School',
 day: 'Feb 6th at 1:30pm',
 reminder: true,
 },
 {
 id: 3,
 text: 'Food Shopping',
 day: 'Feb 5th at 2:30pm',
 reminder: false,
 },])

 //Add Task
 const addTask = (task) => {
 const id = Math.floor(Math.random() * 10000 + 1);
 const newTask = { id, ...task };
 setTasks([...tasks, newTask]);
 }
 //Delete Task
 const deleteTask = (id) => {
 setTasks(tasks.filter((task) => task.id !== id));
 console.log('Delete ', id);
 }
 //Toggle Reminder
 const toggleReminder = (id) => {
 setTasks(tasks.map((task) =>
 task.id === id ? { ...task, reminder: !task.reminder } : task
 ))
 console.log(id);
 }
 return (
 <div className='container'>
 <Header
 onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
 {showAddTask &&<AddTask onAdd={addTask} />}
 {
 tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} 
/>) :
 ('No task to show')
 }
 </div>
 );
}
export default App;*/
import './App.css';
import Header from './component/Header';
import { Tasks } from './component/Tasks';
import { useState, useEffect } from "react"
import { AddTask } from './component/AddTask';
function App() {
const [showAddtask, setShowAddTask] = useState(false);
const [tasks, setTasks] = useState([])
useEffect(() => {
const getTasks = async () => {
const tasksFromServer = await fetchTasks();
setTasks(tasksFromServer);
}
getTasks();
}, []);
//fetch tasks
const fetchTasks = async () => {
const res = await fetch('http://localhost:5000/tasks');
const data = await res.json();
// console.log(data);
return data;
}
//fetch task
const fetchTask = async (id) => {
const res = await fetch(`http://localhost:5000/tasks/${id}`);

const data = await res.json();
// console.log(data);
return data;
}
//Add Task
const addTask = async (task) => {
const res = await fetch('http://localhost:5000/tasks', {
method: 'POST',
headers: { 'Content-type': 'application/json', },
body: JSON.stringify(task),
});
const data = await res.json();
setTasks([...tasks, data]);
// const id = Math.floor(Math.random() * 10000 + 1);
// const newTask = { id, ...task };
// setTasks([...tasks, newTask]);
}
//Delete Task
const deleteTask = async (id) => {
await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE', })
setTasks(tasks.filter((task) => task.id !== id));
console.log('Delete ', id);
}
//Toggle Reminder
const toggleReminder = async (id) => {
const taskToToggle = await fetchTask(id);
const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
const res = await fetch(`http://localhost:5000/tasks/${id}`, {
method: 'PUT',
headers: {
'Content-type': 'application/json',
},
body: JSON.stringify(updTask)
})
const data = await res.json();
setTasks(tasks.map((task) =>
task.id === id ? { ...task, reminder: data.reminder } : task
))
console.log(id);
}
return (
<div className='container'>

<Header
onAdd={() => setShowAddTask(!showAddtask)} showAdd={showAddtask} />
{showAddtask && < AddTask onAdd={addTask} />}
{
tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} 
/>) :
('No task to show')
}

</div>
);
}
export default App;