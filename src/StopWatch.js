import React, { useRef, useEffect, useReducer } from 'react';

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useStopWatch() {
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

  return { handleClearClick, handleRunClick, lapse, running };
}

export default function StopWatch() {
  const stopWatchOne = useStopWatch();
  const stopWatchTwo = useStopWatch();

  return (
    <>
      <label style={{ display: 'block', fontSize: '2em' }}>
        {stopWatchOne.lapse} ms
      </label>
      <button onClick={stopWatchOne.handleRunClick}>
        {stopWatchOne.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={stopWatchOne.handleClearClick}>Clear</button>
      <hr />
      <strong>Lapse Difference:</strong>
      <span>
        {stopWatchOne.lapse - stopWatchTwo.lapse}
        ms
      </span>
      <hr />
      <label style={{ display: 'block', fontSize: '2em' }}>
        {stopWatchTwo.lapse} ms
      </label>
      <button onClick={stopWatchTwo.handleRunClick}>
        {stopWatchTwo.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={stopWatchTwo.handleClearClick}>Clear</button>
    </>
  );
}
