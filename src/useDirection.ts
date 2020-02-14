import React from 'react';
import addons from '@storybook/addons';
import { Direction_MODE_EVENT_NAME } from './constants';
import { Direction } from './typings';

/**
 * Returns the current state of storybook's direction
 */
export function useDirection(): Direction {
  const [direction, setDirection] = React.useState<Direction>('ltr');

  React.useEffect(() => {
    const chan = addons.getChannel();
    chan.on(Direction_MODE_EVENT_NAME, setDirection);
    return () => chan.off(Direction_MODE_EVENT_NAME, setDirection);
  }, []);

  return direction;
}

export * from './constants';
