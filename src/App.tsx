import './App.css'
import { useEffect, useState } from 'react'
import TodoItem from './components/todoItem'
import { v4 as uuidv4 } from 'uuid';
function App() {
   
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('')
  const [filter, setFilter] = useState('date')

  useEffect(() => {
    renderTasks(tasks)
  }, [filter])


  interface Task {
    name: string
    id: string
    date: Date
  }
  function deleteTask (id: string) {
    setTasks(tasks.filter(task => task.id !== id))
  }
  function renderTasks(tasks: Task[]) {
    const res = tasks.map((task) => {
      return <TodoItem text={task.name} key={task.id} id={task.id} onDelete={deleteTask} />
    })
    return res;
  }

  function addTask(e: string) {
    if (e === '') {
      alert('Please enter a task')
      return
    }else{
      const newTask = {name: e, id: uuidv4(), date: new Date()}
      setTasks([...tasks, newTask])
      setTaskInput('')
    }
  }

  function sortTasks(el: string) {
    setFilter(el)
    switch (el) {
      case 'name':
        console.log('name')
        setTasks(tasks.sort((a, b) => a.name.localeCompare(b.name)))
        renderTasks(tasks)
        break
      case 'date':
        console.log('date')
        setTasks(tasks.sort((a, b) => a.date.getTime() - b.date.getTime()))
        renderTasks(tasks)
        break
      default:
        console.log('default')
        break
    }
  }



  const todoList = renderTasks(tasks);
  return (
    
    <div className="todo-container">
        <h1>My To-Do List</h1>

        <form className="input-container" onSubmit={(e) => e.preventDefault()}>
            <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} type="text" id="todo-input" placeholder="Add a new task..." />
            <button onClick={() => addTask(taskInput) } id="add-task-btn" type="submit">Add Task</button>
        </form>

        <div className="sort">
          <h3>sort by:</h3>
          <select onChange={e => sortTasks(e.target.value)}>
            <option value="date">date</option>
            <option value="name">name</option>
          </select>
        </div>

        <ul className="todo-list" id="todo-list">
          {todoList}
        </ul>
    </div>
  )
}

export default App
