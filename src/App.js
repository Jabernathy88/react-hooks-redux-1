import React, { useState } from 'react';
import './App.css';
import uuid from 'uuid/v4';

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: false,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos)
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleChangeCheckbox = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({
        id: uuid(),
        task,
        complete: false
      }))
    }
    setTask('')
    event.preventDefault();
  }

  return (
    <div className="app">
      <h2>Hello from App.js</h2>
      <div className="todo-list-container">
        {todos.map(todo => (
          <div className="todo-list-item" key={todo.id}>
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleChangeCheckbox(todo.id)}
            />
            <strong>{todo.task}</strong>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default App;
