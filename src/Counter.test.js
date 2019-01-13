import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Counter from './Counter';

describe('Counter component', () => {
  afterEach(() => {
    window.localStorage.removeItem('count');
    window.localStorage.removeItem('step');
    window.localStorage.removeItem('history');
  });

  it('counter increments the count', () => {
    const { container, rerender } = render(<Counter />);
    const buttons = container.getElementsByTagName('button');
    const countBtn = buttons.item(0);

    expect(countBtn.textContent).toBe('Count 0');
    fireEvent.click(countBtn);
    rerender(<Counter />);
    expect(countBtn.textContent).toBe('Count 1');
  });

  // it('counter increments the count depending of the step set', () => {
  //   const { container, rerender } = render(<Counter />);
  //   const [incrementInput] = container.getElementsByTagName('input');
  //   const [countBtn] = container.getElementsByTagName('button');

  //   expect(countBtn.textContent).toBe('Count 0');
  //   expect(incrementInput.value).toBe('1');

  //   fireEvent.change(incrementInput, { target: { value: 5 } });
  //   expect(incrementInput.value).toBe('5');

  //   fireEvent.click(countBtn);
  //   expect(countBtn.textContent).toBe('Count 5');
  // });

  it('reset counter', () => {
    const { container, rerender } = render(<Counter />);
    const [countBtn, resetBtn] = container.getElementsByTagName('button');

    fireEvent.click(countBtn);
    rerender(<Counter />);
    expect(countBtn.textContent).toBe('Count 1');

    fireEvent.click(resetBtn);
    rerender(<Counter />);
    expect(countBtn.textContent).toBe('Count 0');
  });

  it('reads and updates count from localStorage', () => {
    window.localStorage.setItem('count', 2);
    const { container, rerender } = render(<Counter />);
    const [countBtn] = container.getElementsByTagName('button');

    expect(countBtn.textContent).toBe('Count 2');
    fireEvent.click(countBtn);
    rerender(<Counter />);
    expect(countBtn.textContent).toBe('Count 3');
    expect(window.localStorage.getItem('count')).toBe('3');
  });

  it('reads and updates step from localStorage', () => {
    window.localStorage.setItem('step', 2);
    const { container, rerender } = render(<Counter />);
    const [incrementInput] = container.getElementsByTagName('input');

    expect(incrementInput.value).toBe('2');
    fireEvent.change(incrementInput, { target: { value: 4 } });
    expect(incrementInput.value).toBe('4');
    rerender(<Counter />);
    expect(window.localStorage.getItem('step')).toBe('4');
  });
});
