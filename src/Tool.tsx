import * as React from 'react';
import { IconButton } from '@storybook/components';
import { API, useAddonState } from '@storybook/api';
import { Direction_MODE_EVENT_NAME, ADDON_ID } from './constants';
import { Direction } from './typings';
import DirectionLTR from './icons/DirectionLTR';
import DirectionRTL from './icons/DirectionRTL';

interface PageDirectionProps {
  api: API;
}

export const PageDirection: React.FunctionComponent<
  PageDirectionProps
> = props => {
  const [direction, setDirection] = useAddonState<Direction>(ADDON_ID, 'ltr');

  function setMode() {
    const newDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    setDirection(newDirection);
  }

  React.useEffect(() => {
    props.api.getChannel().emit(Direction_MODE_EVENT_NAME, direction);
  }, [direction, props.api]);

  return (
    <IconButton
      key="direction-mode"
      active={direction === 'rtl'}
      title={
        direction === 'ltr'
          ? 'Change direction to rtl'
          : 'Change direction to ltr'
      }
      onClick={() => setMode()}
    >
      {direction === 'ltr' ? <DirectionLTR /> : <DirectionRTL />}
    </IconButton>
  );
};

export default PageDirection;
