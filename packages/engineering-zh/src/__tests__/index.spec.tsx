import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutoComplete from '../index';
import * as Transition from '../components/transition';
jest.spyOn(Transition, 'FadeSlide').mockImplementation(({ visible, children }) => <>{visible && children}</>);

describe('test AutoComplete', () => {
  function toggleDropdown() {
    screen.getByTestId('input').click();
  }

  const defaultProps: React.ComponentProps<typeof AutoComplete> = {
    value: '',
    onChange: () => {},
    onSelect: () => {},
    options: [],
  };

  it('should update value on props change', () => {
    const App = () => {
      const [value, setValue] = useState('');
      return <AutoComplete {...defaultProps} value={value} onChange={(data) => setValue(data)} />;
    };
    render(<App />);
    const expectedValue = '1234';
    fireEvent.change(screen.getByTestId('input'), {
      target: { value: expectedValue },
    });
    toggleDropdown();
    expect(screen.getByTestId('input')).toHaveValue(expectedValue);
  });

  it('should render options correct', () => {
    const App = () => {
      return <AutoComplete {...defaultProps} options={['option1', 'option2', 'option3']} />;
    };
    render(<App />);
    toggleDropdown();
    expect(screen.queryAllByText(/option\d/)).toHaveLength(3);
  });

  it('should set option when mouse click or press enter', () => {
    const mockOnSelect = jest.fn();
    const App = () => {
      return <AutoComplete {...defaultProps} onSelect={mockOnSelect} options={['option1', 'option2', 'option3']} />;
    };
    render(<App />);
    fireEvent.keyDown(screen.getByTestId('input'), { key: 'Enter' }); // open dropdown
    fireEvent.keyDown(screen.getByTestId('input'), { key: 'Enter' }); // apply value
    expect(mockOnSelect).toHaveBeenCalledWith('option1');

    toggleDropdown();
    screen.getByText('option2').click();
    expect(mockOnSelect).toHaveBeenCalledWith('option2');
  });

  it('should highlight option when mouseover or keyboard press', () => {
    const App = () => {
      return <AutoComplete {...defaultProps} options={['option1', 'option2', 'option3']} />;
    };
    render(<App />);
    toggleDropdown();
    fireEvent.mouseOver(screen.getByText('option1'));
    expect(screen.getByTestId('option_item_hovered')).toHaveTextContent('option1');
    fireEvent.keyDown(screen.getByTestId('input'), { key: 'ArrowDown' });
    expect(screen.getByTestId('option_item_hovered')).toHaveTextContent('option2');
    fireEvent.keyDown(screen.getByTestId('input'), { key: 'ArrowUp' });
    expect(screen.getByTestId('option_item_hovered')).toHaveTextContent('option1');
  });

  it('should show dropdown when isLoading && hide when blur', () => {
    const App = () => {
      return <AutoComplete {...defaultProps} isLoading options={['option1', 'option2', 'option3']} />;
    };
    render(<App />);
    expect(screen.getByTestId('dropdown')).toBeVisible();
    fireEvent.blur(screen.getByTestId('input'));
    expect(screen.queryByTestId('dropdown')).toBeNull();
  });
});
