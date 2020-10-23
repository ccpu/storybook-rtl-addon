import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { useDirection } from '../dist';

export default {
  component: 'direction',
  title: 'direction',
  parameters: { setDirectionKnob: true },
  decorators: [withKnobs],
};

const Component = ({ context }) => {
  const dir = useDirection(context);
  return (
    <div>
      {select('direction', { ltr: 'ltr', rtl: 'rtl' }, 'ltr') + '-' + dir}
    </div>
  );
};

export const withDirection = (context) => <Component context={context} />;

export const withNoDirection = () => {
  return <div>No direction</div>;
};
