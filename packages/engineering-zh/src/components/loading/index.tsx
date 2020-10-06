import React from 'react';
import './style.scss';

export default function Loading({ active }: { active: boolean }): JSX.Element {
  if (!active) return <></>;
  return (
    <div className="loading-spinner">
      <div />
    </div>
  );
}
