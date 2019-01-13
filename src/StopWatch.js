import React, { useRef, useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LAPSE':
      return {
        ...state,
        lapse: action.now - action.startTime
      };
    case 'TOGGLE_RUNNING':
      return {
        ...state,
        running: !state.running
      };
    case 'CLEAR':
      return {
        ...state,
        lapse: 0,
        running: false
      };
    default:
      return state;
  }
}

export default function StopWatch() {
  const [{ lapse, running }, dispatch] = useReducer(reducer, {
    lapse: 0,
    running: false
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    // clear the interval when this component is unmounted.
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleRunClick() {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'LAPSE', now: Date.now(), startTime });
      }, 0);
    }

    dispatch({ type: 'TOGGLE_RUNNING' });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    dispatch({ type: 'CLEAR' });
  }

  return (
    <>
      <label style={{ display: 'block', fontSize: '2em' }}>{lapse} ms</label>
      <button onClick={handleRunClick}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={handleClearClick}>Clear</button>
    </>
  );
}
