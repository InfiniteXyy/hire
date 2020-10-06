import React, { useEffect, useRef } from 'react';

export default function useKeyPress(keyMap: {
  [k: string]: () => void;
}): React.MutableRefObject<HTMLInputElement | null> {
  const elementRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const element = elementRef.current;
    const handler = (e: KeyboardEvent) => {
      if (keyMap[e.key]) {
        e.preventDefault();
        keyMap[e.key]();
      }
    };
    element?.addEventListener('keydown', handler);
    return () => element?.removeEventListener('keydown', handler);
  }, [keyMap]);
  return elementRef;
}
