import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import Loading from './components/loading';
import EmptyView from './components/empty';

import './style.scss';
import useKeyPress from './helpers/useKeyPress';
import { FadeSlide } from './components/transition';

interface AutoCompleteProps {
  value: string;
  onChange(input: string): void;
  onSelect(option: string): void;
  options: string[];
  // render your custom option component by passing a function
  optionRenderer?(option: string, active: boolean): JSX.Element;
  // map option content to key/id, AutoComplete will use it to determine active status
  optionKeyExtractor?(option: string): string;
  error?: string;
  isLoading?: boolean;
  placeholder?: string;
}

export default function AutoComplete(props: AutoCompleteProps): JSX.Element {
  const {
    value,
    onChange,
    onSelect,
    options,
    isLoading = false,
    error,
    optionRenderer,
    optionKeyExtractor,
    placeholder,
  } = props;

  const [isShowDropdown, setShowDropdown] = useState(false);

  const [currentHoverIndex, setCurrentHoverIndex] = useState(0);

  const keypressRef = useKeyPress({
    ArrowDown: () => setCurrentHoverIndex((i) => Math.min(options.length - 1, i + 1)),
    ArrowUp: () => setCurrentHoverIndex((i) => Math.max(0, i - 1)),
    Enter: () => {
      if (isShowDropdown && options.length > currentHoverIndex) {
        onSelect(options[currentHoverIndex]);
      }
      setShowDropdown((cur) => !cur);
    },
  });

  useEffect(() => {
    if (isLoading) setShowDropdown(true);
  }, [isLoading]);

  const renderDropdown = (): JSX.Element => {
    return (
      <FadeSlide visible={isShowDropdown}>
        <ul className="autocomplete__dropdown">
          {options.map((option, index) => {
            const isActive = (optionKeyExtractor ? optionKeyExtractor(option) : option) === value;
            return (
              <li
                className={cls('autocomplete__dropdown-item', {
                  'autocomplete__dropdown-item--active': isActive,
                  'autocomplete__dropdown-item--hover': index === currentHoverIndex,
                })}
                onMouseOver={() => setCurrentHoverIndex(index)}
                onClick={() => {
                  onSelect(option);
                  setShowDropdown(false);
                }}
                key={option}
              >
                {optionRenderer ? optionRenderer(option, option === value) : option}
              </li>
            );
          })}
          <Loading active={isLoading} />
          <EmptyView active={options.length === 0 && !isLoading} />
        </ul>
      </FadeSlide>
    );
  };

  return (
    <div className="autocomplete">
      {error && <div className="autocomplete__error-msg">{error}</div>}
      <input
        ref={keypressRef}
        className="autocomplete__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => setShowDropdown((cur) => !cur)}
        onBlur={() => setShowDropdown(false)}
        placeholder={placeholder}
      />
      {renderDropdown()}
    </div>
  );
}
