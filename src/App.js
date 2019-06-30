import React, { useState, useReducer } from 'react';
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

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState('');

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' })
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }
    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }
    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }
    return false;
  })

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
        <div className="filters-container">
          <button className="filter-btn" type="button" onClick={handleShowAll}>
            Show All
          </button>
          <button className="filter-btn" type="button" onClick={handleShowComplete}>
            Show Complete
          </button>
          <button className="filter-btn" type="button" onClick={handleShowIncomplete}>
            Show Incomplete
          </button>
        </div>
        {filteredTodos.map(todo => (
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
