import React, { useState, useEffect } from 'react';

import CounterHistory from './CounterHistory';

function useCounter({ initialCount, initialStep, initialHistory } = {}) {
  const [count, setCount] = useState(initialCount);
  const [step, setStep] = useState(initialStep);
  const [history, setHistory] = useState(initialHistory);
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

// performance issue: every single time that the render method runs, we're going to be reading into localStorage.
function setInitialValues() {
  const initialCount = () => Number(window.localStorage.getItem('count') || 0);
  const initialStep = () => Number(window.localStorage.getItem('step') || 1);
  const history = () => {
    return JSON.parse(window.localStorage.getItem('history') || '[]');
  };

  return {
    initialCount,
    initialStep,
    initialHistory: history
  };
}

export default function Counter() {
  // fix performance issue: if we will pass it a function to the useState, it will only call it on the first render.
  const {
    count,
    increment,
    reset,
    step,
    setIncrement,
    selectHistoryItem,
    history
  } = useCounter(setInitialValues());
  const handleOnChangeStep = e => setIncrement(+e.target.value);

  // the euseEffect callback is going to be called after every single time our component rerenders.
  // if we will pass the second params [count], React will only run our callback when the count value changes.
  useEffect(
    () => {
      window.localStorage.setItem('count', count);
    },
    [count]
  );

  useEffect(
    () => {
      window.localStorage.setItem('step', step);
    },
    [step]
  );

  useEffect(
    () => {
      window.localStorage.setItem('history', JSON.stringify(history));
    },
    [history]
  );

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
          <CounterHistory
            history={history}
            onSelectHistoryItem={selectHistoryItem}
          />
        </div>
      ) : null}
    </div>
  );
}
