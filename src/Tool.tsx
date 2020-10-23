import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@storybook/components';
import { API } from '@storybook/api';
import {
  Direction_MODE_EVENT_NAME,
  Direction_SET_MODE_EVENT_NAME,
  SET_DIRECTION_KNOB,
} from './constants';
import { Direction } from './typings';
import DirectionLTR from './icons/DirectionLTR';
import DirectionRTL from './icons/DirectionRTL';
import { getKnobDirection } from './utils';

import { CHANGE, SET } from '@storybook/addon-knobs/dist/shared';

interface PageDirectionProps {
  api: API;
}

const emitEvent = (api: API, direction: Direction) => {
  api.getChannel().emit(Direction_MODE_EVENT_NAME, direction);
};

export const PageDirection: React.FunctionComponent<PageDirectionProps> = (
  props
) => {
  const { api } = props;
  const [direction, setDirection] = useState<Direction>();
  const data = api.getCurrentStoryData();
  const currentStory = React.useRef<string>();
  const hasDirectionKnob = React.useRef<boolean>(false);

  const shouldSetKnob =
    data && api.getParameters(data.id)[SET_DIRECTION_KNOB] === true;

  const handleChange = useCallback(() => {
    setDirection((state) => {
      const newDir = !state || state === 'ltr' ? 'rtl' : 'ltr';
      return newDir;
    });
  }, []);

  useEffect(() => {
    const chan = api.getChannel();

    chan.on(Direction_SET_MODE_EVENT_NAME, handleChange);

    return () => chan.off(Direction_SET_MODE_EVENT_NAME, handleChange);
  }, [api, handleChange]);

  useEffect(() => {
    if (!shouldSetKnob || !hasDirectionKnob.current) return;

    if (direction) {
      const dirKnob = getKnobDirection();
      if (dirKnob === direction) return;
      const query = { 'knob-direction': direction };

      api.emit(CHANGE, { name: 'direction', value: direction });
      api.setQueryParams(query);
    }
  }, [api, direction, shouldSetKnob]);

  React.useEffect(() => {
    if (direction) {
      emitEvent(api, direction);
    }
  }, [api, direction]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSet = (ev: any) => {
      if (!shouldSetKnob) return;
      if (!ev.knobs.direction) return;

      const dir = ev.knobs.direction.value;

      if (dir === 'ltr' || dir === 'rtl') {
        hasDirectionKnob.current = true;

        setDirection(ev.knobs.direction.value);
      }
    };

    api.on(SET, handleSet);

    return () => {
      api.off(SET, handleSet);
    };
  }, [api, shouldSetKnob]);

  React.useEffect(() => {
    if (!data || currentStory.current === data.id) return;

    currentStory.current = data.id;
    hasDirectionKnob.current = false;
    setDirection(undefined);
  }, [api, data]);

  return (
    <IconButton
      key="direction-mode"
      title={
        !direction || direction === 'ltr'
          ? 'Change direction to rtl'
          : 'Change direction to ltr'
      }
      onClick={handleChange}
    >
      {!direction || direction === 'ltr' ? <DirectionLTR /> : <DirectionRTL />}
    </IconButton>
  );
};

export default PageDirection;
