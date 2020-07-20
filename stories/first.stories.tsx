import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  component: 'direction',
  title: 'direction',
  parameters: { setDirectionKnob: true },
  decorators: [withKnobs],
};

export function WithDirection() {
  return <div>{text('direction', 'ltr')}</div>;
}
