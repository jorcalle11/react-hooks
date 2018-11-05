import React, { useState } from 'react';

function useCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const selectHistoryItem = index => {
    setHistory(history.slice(0, index + 1));
    setCount(history[index]);
  };

  const handleSetCount = value => {
    setHistory(history.concat(value));
    setCount(value);
  };

  const reset = () => {
    setHistory([]);
    setCount(0);
  };

  return {
    count,
    setCount: handleSetCount,
    history,
    selectHistoryItem,
    reset
  };
}

export default function Counter() {
  const [increment, setIncrement] = useState(1);
  const { count, setCount, history, reset, selectHistoryItem } = useCounter();
  const handleOnCount = () => setCount(count + increment);
  const handleIncrementChange = e => setIncrement(+e.target.value);

  return (
    <div>
      <div>
        <label htmlFor="increment">Set increment: </label>
        <input
          id="increment"
          type="number"
          value={increment}
          onChange={handleIncrementChange}
        />
      </div>
      <p>
        Count <b>{count}</b>
      </p>
      <p>
        <button onClick={reset}>Reset</button>
        <HistoryList
          history={history}
          onSelectHistoryItem={selectHistoryItem}
        />
      </p>
      <button onClick={handleOnCount}>Count {increment}</button>
    </div>
  );
}

function HistoryList({ history, onSelectHistoryItem }) {
  return (
    <>
      {history.map((h, index) => (
        <button key={h} onClick={() => onSelectHistoryItem(index)}>
          {h}
        </button>
      ))}
    </>
  );
}
