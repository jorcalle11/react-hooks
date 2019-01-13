import React, { useState } from 'react';

function useCounter({ initialCount = 0, initialStep = 1 } = {}) {
  const [count, setCount] = useState(initialCount);
  const [step, setStep] = useState(initialStep);
  const [history, setHistory] = useState([]);
  const setIncrement = value => setStep(value);

  const increment = () => {
    const value = count + step;
    setCount(value);
    setHistory([...history, value]);
  };

  const reset = () => {
    setHistory([]);
    setCount(0);
    setStep(1);
  };

  const selectHistoryItem = currentCount => {
    const index = history.findIndex(h => h === currentCount);
    setHistory(history.slice(0, index + 1));
    setCount(currentCount);
  };

  return {
    count,
    increment,
    reset,
    setIncrement,
    selectHistoryItem,
    step,
    history
  };
}

export default function Counter() {
  const {
    count,
    increment,
    reset,
    step,
    setIncrement,
    selectHistoryItem,
    history
  } = useCounter();
  const handleOnChangeStep = e => setIncrement(+e.target.value);

  return (
    <div>
      <div style={{ marginBottom: 5 }}>
        <label htmlFor="increment">Set increment: </label>
        <input
          id="increment"
          type="number"
          min={1}
          value={step}
          onChange={handleOnChangeStep}
        />
        <button onClick={increment}>Count {count}</button>
        <button onClick={reset}>Reset</button>
      </div>
      {history.length ? (
        <div>
          History:
          <HistoryList
            history={history}
            onSelectHistoryItem={selectHistoryItem}
          />
        </div>
      ) : null}
    </div>
  );
}

function HistoryList({ history, onSelectHistoryItem }) {
  return (
    <>
      {history.map(h => (
        <button key={h} onClick={() => onSelectHistoryItem(h)}>
          {h}
        </button>
      ))}
    </>
  );
}
