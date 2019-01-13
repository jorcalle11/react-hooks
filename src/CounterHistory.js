import React from 'react';

export default function HistoryList({ history, onSelectHistoryItem }) {
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
