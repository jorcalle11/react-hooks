import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Counter from './Counter';

describe('Counter component', () => {
  it('counter increments the count', () => {
    const { container } = render(<Counter />);
    const buttons = container.getElementsByTagName('button');
    const incrementButton = buttons.item(0);

    expect(incrementButton.textContent).toBe('Count 0');
    fireEvent.click(incrementButton);
    expect(incrementButton.textContent).toBe('Count 1');
  });

  it('counter increments the count depending of the increment set', () => {
    const { container } = render(<Counter />);
    const inputs = container.getElementsByTagName('input');
    const inputIncrement = inputs.item(0);
    const buttons = container.getElementsByTagName('button');
    const incrementButton = buttons.item(0);

    expect(incrementButton.textContent).toBe('Count 0');
    fireEvent.change(inputIncrement, { target: { value: 4 } });
    fireEvent.click(incrementButton);
    expect(incrementButton.textContent).toBe('Count 4');
  });

  it('reset counter', () => {
    const { container } = render(<Counter />);
    const [countBtn, resetBtn] = container.getElementsByTagName('button');

    fireEvent.click(countBtn);
    expect(countBtn.textContent).toBe('Count 1');
    fireEvent.click(resetBtn);
    expect(countBtn.textContent).toBe('Count 0');
  });
});
