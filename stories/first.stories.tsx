import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { useDirection } from '../dist';
import { listenerCount } from 'process';

export default {
  component: 'direction',
  title: 'direction',
  parameters: { setDirectionKnob: true },
  decorators: [withKnobs],
};

export function WithDirection(context) {
  const dir = useDirection(context);
  return (
    <div>
      {select('direction', { ltr: 'ltr', rtl: 'rtl' }, 'ltr')}-{dir}
    </div>
  );
}
