import React, { useState } from 'react';

const Upper = React.memo(function Upper({ children }) {
  const [count, setCount] = useState(0);
  console.log('rendering', children);

  return (
    <div style={{ display: 'block' }}>
      Uppercase version: {children.toUpperCase()}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
});

export default function Gretting() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleChangeFirst = e => setFirstName(e.target.value);
  const handleChangeLast = e => setLastName(e.target.value);

  return (
    <div style={{ marginTop: 10 }}>
      <label htmlFor="first-name">First Name: </label>
      <input id="first-name" value={firstName} onChange={handleChangeFirst} />
      <Upper children={firstName} />
      <hr />
      <label htmlFor="last-name">Last Name: </label>
      <input id="last-name" value={lastName} onChange={handleChangeLast} />
      <Upper children={lastName} />
    </div>
  );
}
