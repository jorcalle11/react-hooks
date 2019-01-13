import React, { useRef, useEffect, useReducer } from 'react';

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

export default function StopWatch() {
  const [{ lapse, running }, setState] = useReducer(reducer, {
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
        setState({ lapse: Date.now() - startTime });
      }, 0);
    }

    setState({ running: !running });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, running: false });
  }

  return (
    <>
      <label style={{ display: 'block', fontSize: '2em' }}>{lapse} ms</label>
      <button onClick={handleRunClick}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={handleClearClick}>Clear</button>
    </>
  );
}
