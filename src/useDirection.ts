import React from 'react';
import addons, { StoryContext } from '@storybook/addons';
import {
  Direction_MODE_EVENT_NAME,
  // Direction_SET_MODE_EVENT_NAME
} from './constants';
import { Direction } from './typings';
import { getDefault } from './utils';
import { CHANGE } from '@storybook/addon-knobs/dist/shared';
/**
 * Returns the current state of storybook's direction
 */
export function useDirection(context: StoryContext): Direction {
  const [direction, setDirection] = React.useState<Direction>(
    getDefault(context)
  );

  React.useEffect(() => {
    const chan = addons.getChannel();

    const handleChange = (dir: Direction) => {
      setDirection(dir);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const dirKnob = urlParams.get('knob-direction');

    if (dirKnob) {
      handleChange(dirKnob as Direction);
      chan.emit(Direction_MODE_EVENT_NAME, dirKnob);
      chan.emit(CHANGE, { name: 'direction', value: direction });
    }

    chan.on(Direction_MODE_EVENT_NAME, handleChange);
    return () => chan.off(Direction_MODE_EVENT_NAME, handleChange);
  }, [direction]);

  return direction;
}

export * from './constants';
