import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({ todo }) {
    const [editable, setEditable] = useState(false)
    const [message, setMessage] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: message })
        setEditable(false)
    }
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }
    return (
        <div className={`todo-items ${todo.completed ? 'bg-green' : 'bg-grey'}`}>
            <input type="checkbox" checked={todo.completed} onChange={toggleCompleted} />
            <input type="text" className={`list-input ${editable ? 'border-cyan' : 'border-transparent'} ${todo.completed ? 'line-through' : ""}`} value={message} onChange={(e) => setMessage(e.target.value)} readOnly={!editable} />

            <button className='list-btn' onClick={() => {
                if (todo.completed) return;
                if (editable) {
                    editTodo();
                } else {
                    setEditable((prev) => !prev);
                }
            }
            } disabled={todo.completed}>{editable? "Save" : 'Edit'}</button>

            <button className='list-btn' onClick={()=> deleteTodo(todo.id)}>Delete</button>
        </div>
    )
}

export default TodoItem