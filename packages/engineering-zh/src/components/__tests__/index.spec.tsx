import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyView from '../empty';
import Loading from '../loading';
import { FadeSlide } from '../transition';

describe('test AutoComplete external utils', () => {
  it('should emptyView return oops ', () => {
    render(<EmptyView active={true} />);
    expect(screen.queryByText(/oops/i)).toBeTruthy();
  });

  it('should loading match snapshot', () => {
    const wrapper = render(<Loading active={true} />);
    expect(wrapper.baseElement).toMatchSnapshot('loading');
  });

  it('should transition works', () => {
    // TODO: more detailed test
    jest.useFakeTimers();
    render(
      <FadeSlide visible={true}>
        <div>123</div>
      </FadeSlide>
    );
    expect(screen.queryByText('123')).not.toBeNull();
  });
});
