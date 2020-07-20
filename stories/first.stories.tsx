import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { useDirection } from '../dist';

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
      {text('direction', 'ltr')}-{dir}
    </div>
  );
}
