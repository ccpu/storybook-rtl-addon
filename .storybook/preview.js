import { withDirection } from '../dist/withDirection';

export const decorators = [withDirection];

// somehow wont work, in dev but will work on production
export const parameters = {
  setLocaleToKnob: true,
};
