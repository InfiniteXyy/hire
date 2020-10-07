import React, { useLayoutEffect, useRef, useState } from 'react';
import cls from 'classnames';
import './style.scss';

interface ContainerProps {
  visible: boolean;
  children: React.ReactNode;
}

export interface TransitionProps extends ContainerProps {
  cssPrefix: string;
}

type AnimStatus = 'None' | 'Begin' | 'MoveIn' | 'Finished' | 'MoveOut';
const DEFAULT_TRANSITION_DURATION = 150;

const mapStateToClass = (cssPrefix: string, status: AnimStatus): string => {
  switch (status) {
    case 'Begin':
      return `${cssPrefix}-enter`;
    case 'MoveIn':
      return `${cssPrefix}-enter--active`;
    case 'Finished':
      return `${cssPrefix}-exit`;
    case 'MoveOut':
      return `${cssPrefix}-exit--active`;
    default:
      return '';
  }
};

export function Transition(props: TransitionProps): JSX.Element {
  const { visible, children, cssPrefix } = props;
  const completeTimer = useRef<number>();
  const [animStatus, setAnimStatus] = useState<AnimStatus>('None');

  useLayoutEffect(() => {
    if (animStatus === 'Begin') {
      setTimeout(() => setAnimStatus('MoveIn'), 0);
    }
  }, [animStatus]);

  useLayoutEffect(() => {
    setAnimStatus(visible ? 'Begin' : 'MoveOut');
    clearTimeout(completeTimer.current);
    completeTimer.current = window.setTimeout(() => {
      setAnimStatus(visible ? 'Finished' : 'None');
    }, DEFAULT_TRANSITION_DURATION);
    return () => clearTimeout(completeTimer.current);
  }, [visible]);

  return (
    <>
      {animStatus !== 'None' &&
        React.cloneElement(children as React.ReactElement, {
          className: cls(
            (children as React.ReactElement).props.className || '',
            mapStateToClass(cssPrefix, animStatus)
          ),
        })}
    </>
  );
}

export function FadeSlide(props: Omit<TransitionProps, 'cssPrefix'>): JSX.Element {
  const { visible, children } = props;
  return (
    <Transition visible={visible} cssPrefix="fade-slide">
      <div>{children}</div>
    </Transition>
  );
}
