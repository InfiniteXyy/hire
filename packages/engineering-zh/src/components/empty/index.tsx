import React from 'react';
import './style.scss';

export default function EmptyView({ active }: { active: boolean }): JSX.Element {
  if (!active) return <></>;
  return (
    <div className="empty-view">
      <div>Oops, empty result</div>
    </div>
  );
}
