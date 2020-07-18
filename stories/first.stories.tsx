import React from 'react';
import { useDirection } from 'storybook-rtl-addon';

export default {
  component: 'direction',
  title: 'direction',
  parameters: { locales: ['en', 'fr'] }
};

export function WithDirection(context) {
  const direction = useDirection(context);
  return <div dir={direction}>{direction}</div>;
}
