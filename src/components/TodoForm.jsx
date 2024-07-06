import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
    const add = (e) => {
        e.preventDefault()
        if(!todo) return
        addTodo({todo, completed: false})
        setTodo("")
    }
  return (
    <form onSubmit={add}>
        <input className='main-input' type="text" placeholder='write todo...' value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button className='frm-btn' type='submit'>Add</button>
    </form>
  )
}

export default TodoForm