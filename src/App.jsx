import { TodoProvider } from './contexts/TodoContext.js'
import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import TodoItem from './components/TodoItem.jsx'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  // Local Storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='main-container'>
        <div className='container'>
          <h1>Manage Your Todos</h1>
          <div>
            <TodoForm/>
          </div>
          <div>
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
