import React from 'react';
import useKeyPress from '../useKeyPress';
import { render, fireEvent, screen } from '@testing-library/react';

describe('test helper hooks', () => {
  it('should useKeyPress work', () => {
    const mockLeft = jest.fn();
    const App = () => {
      const ref = useKeyPress({ ArrowLeft: () => mockLeft() });
      return <div data-testid="target" ref={ref} />;
    };
    render(<App />);
    fireEvent.keyDown(screen.getByTestId('target'), { key: 'ArrowLeft' });
    expect(mockLeft).toHaveBeenCalled();
  });
});
