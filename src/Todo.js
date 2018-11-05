import React, { useState, useRef, useReducer } from 'react';

export default function Todo() {
  const [tasks, dispatch] = useReducer(reducer, {});
  const removeTask = id => dispatch({ type: 'remove', id });
  const addTask = text => dispatch({ type: 'add', text });
  const toggleTask = id => dispatch({ type: 'toggle_task', id });

  return (
    <>
      <h1>Todo List</h1>
      <TodoList
        tasks={tasks}
        onRemoveTask={removeTask}
        onCompleteTask={toggleTask}
      />
      <TodoForm onAdd={addTask} />
    </>
  );
}

function TodoList({ tasks = {}, onRemoveTask, onToggleTask }) {
  return (
    <ul>
      {Object.keys(tasks).map(id => (
        <TodoItem
          key={id}
          {...tasks[id]}
          onRemoveTask={onRemoveTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </ul>
  );
}

function TodoItem({ id, completed, description, onRemoveTask, onToggleTask }) {
  return (
    <li>
      <input type="checkbox" checked={completed} disabled={true} />
      <span onClick={() => onToggleTask(id)}>{description}</span>
      <button onClick={() => onRemoveTask(id)}>remove</button>
    </li>
  );
}

function TodoForm({ onAdd }) {
  const [task, setTask] = useState('');
  const inputEl = useRef(null);
  const handleChange = e => setTask(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    onAdd(task);
    setTask('');
    inputEl.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputEl}
        value={task}
        onChange={handleChange}
        placeholder="Write something..."
      />
      <input type="submit" value="Add" />
    </form>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const id = getNextId(state);
      return {
        ...state,
        [id]: { id, completed: false, description: action.text }
      };
    }
    case 'remove':
      return Object.keys(state).reduce((res, key) => {
        if (+key !== action.id) {
          res[key] = state[key];
        }
        return res;
      }, {});
    case 'toggle_task': {
      const id = action.id;
      return {
        ...state,
        [id]: { ...state[id], completed: !state[id].completed }
      };
    }
    default:
      return state;
  }
}

function getNextId(tasks = {}) {
  const ids = Object.keys(tasks);
  const values = ids.length ? ids : [0];
  const nextId = Math.max(...values) + 1;
  return nextId;
}
