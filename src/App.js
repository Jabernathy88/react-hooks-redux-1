import React, { useState } from 'react';
import './App.css';

const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: 'true',
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {
  const [task, setTask] = useState('');

  const handleChangeInput = event => {

  };

  return (
  <div className="app">
    <h2>Hello from App.js</h2>
    <ul>
      {initialTodos.map(todo => (
        <li key={todo.id}>
          <strong>{todo.task}</strong>
        </li>
      ))}
    </ul>

    <input type="text" value={task} onChange={handleChangeInput} />
  </div>
  )
}

export default App;
