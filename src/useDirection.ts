import React from 'react';
import addons, { StoryContext } from '@storybook/addons';
import {
  Direction_MODE_EVENT_NAME
  // Direction_SET_MODE_EVENT_NAME
} from './constants';
import { Direction } from './typings';
import { getDefault } from './utils';

/**
 * Returns the current state of storybook's direction
 */
export function useDirection(context: StoryContext): Direction {
  const [direction, setDirection] = React.useState<Direction>(
    getDefault(context)
  );
  React.useEffect(() => {
    const chan = addons.getChannel();
    chan.on(Direction_MODE_EVENT_NAME, setDirection);
    return () => chan.off(Direction_MODE_EVENT_NAME, setDirection);
  }, []);

  return direction;
}

export * from './constants';
