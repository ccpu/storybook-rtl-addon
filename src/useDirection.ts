import React from 'react';
import addons, { StoryContext } from '@storybook/addons';
import { Direction_MODE_EVENT_NAME, SET_DIRECTION_KNOB } from './constants';
import { Direction } from './typings';
import { getDefault, getParamVal, getKnobDirection } from './utils';

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

    if (getParamVal(context, SET_DIRECTION_KNOB)) {
      const dirKnob = getKnobDirection();
      if (dirKnob && direction !== dirKnob) {
        handleChange(dirKnob as Direction);
        chan.emit(Direction_MODE_EVENT_NAME, dirKnob);
      }
    }

    chan.on(Direction_MODE_EVENT_NAME, handleChange);
    return () => chan.off(Direction_MODE_EVENT_NAME, handleChange);
  }, [context, context.parameters, direction]);

  return direction;
}

export * from './constants';
