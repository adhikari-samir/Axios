import React from "react";
import useTodoStore from "./todo";
import { useState } from "react";

function Todolist() {
  const [input, setInput] = useState('');
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodoStore();

  const handleAdd = () => {
    if (input.trim() !== '') {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1> Todo App (Zustand)</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAdd} style={{ marginLeft: '8px' }}>
          Add
        </button>
      </div>

      <ul style={{ marginTop: '20px' }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginBottom: '8px',
            }}
          >
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;