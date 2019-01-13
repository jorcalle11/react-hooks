import React, { useState, useRef, useEffect } from 'react';

export default function StopWatch() {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(false);
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
        setLapse(Date.now() - startTime);
      }, 0);
    }

    setRunning(!running);
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setLapse(0);
    setRunning(false);
  }

  return (
    <>
      <label style={{ display: 'block', fontSize: '2em' }}>{lapse} ms</label>
      <button onClick={handleRunClick}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={handleClearClick}>Clear</button>
    </>
  );
}
