import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@storybook/components';
import { API } from '@storybook/api';
import {
  Direction_MODE_EVENT_NAME,
  DIRECTION_PARAM_KEY,
  Direction_SET_MODE_EVENT_NAME,
  SET_DIRECTION_KNOB,
} from './constants';
import { Direction } from './typings';
import DirectionLTR from './icons/DirectionLTR';
import DirectionRTL from './icons/DirectionRTL';
import { getParamVal, getKnobDirection } from './utils';
import { LOCALES_PARAM_KEY } from 'storybook-addon-locale/dist/constants';
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
  const [direction, setDirection] = useState<Direction>('ltr');
  const data = api.getCurrentStoryData();

  const handleChange = useCallback(
    (dir?: Direction) => {
      if (dir && typeof dir === 'string') {
        setDirection(dir);
        emitEvent(api, dir);
      } else {
        setDirection((state) => {
          const newDir = state === 'rtl' ? 'ltr' : 'rtl';
          emitEvent(api, newDir);
          return newDir;
        });
      }
    },
    [api]
  );

  const handleDefault = useCallback(() => {
    const def = getParamVal(api.getCurrentStoryData(), DIRECTION_PARAM_KEY);
    if (def) handleChange(def);
  }, [api, handleChange]);

  useEffect(() => {
    const chan = api.getChannel();
    chan.on(Direction_SET_MODE_EVENT_NAME, handleChange);
    return () => chan.off(Direction_SET_MODE_EVENT_NAME, handleChange);
  }, [api, handleChange]);

  useEffect(() => {
    if (direction) {
      if (!data) return;
      if (api.getParameters(data.id)[SET_DIRECTION_KNOB]) {
        const dirKnob = getKnobDirection();
        if (dirKnob === direction) return;
        const query = { 'knob-direction': direction };
        api.emit(CHANGE, { name: 'direction', value: direction });
        api.setQueryParams(query);
      }
    }
  }, [api, data, direction, handleChange]);

  useEffect(() => {
    if (!data || !api.getParameters(data.id)[SET_DIRECTION_KNOB]) return;

    const handleSet = (ev: any) => {
      if (!ev.knobs.direction) return;
      const dir = ev.knobs.direction.value;
      if (dir === 'ltr' || dir === 'rtl') {
        emitEvent(api, dir);
        setDirection(ev.knobs.direction.value);
      }
    };

    api.on(SET, handleSet);

    return () => {
      api.off(SET, handleSet);
    };
  }, [api, data, handleChange]);

  useEffect(() => {
    const channel = api.getChannel();

    function handleEvents() {
      const localeAddonPropVal = getParamVal(
        api.getCurrentStoryData(),
        LOCALES_PARAM_KEY
      );
      /*
        to prevent multiple event emit handleDefault will not be called if locale addon install.
        instead locale addon will  emit Direction_SET_MODE_EVENT_NAME
      */
      if (localeAddonPropVal && localeAddonPropVal !== false) return;
      handleDefault();
    }

    channel.on('docsRendered', handleEvents);
    channel.on('storyRendered', handleEvents);
    return () => {
      channel.removeListener('docsRendered', handleEvents);
      channel.removeListener('storyRendered', handleEvents);
    };
  }, [api, handleDefault]);

  return (
    <IconButton
      key="direction-mode"
      title={
        direction === 'ltr'
          ? 'Change direction to rtl'
          : 'Change direction to ltr'
      }
      onClick={handleChange}
    >
      {direction === 'ltr' ? <DirectionLTR /> : <DirectionRTL />}
    </IconButton>
  );
};

export default PageDirection;
