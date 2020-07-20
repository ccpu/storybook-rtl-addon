import '../register';
import '@storybook/addon-knobs/register';
import { addParameters } from '@storybook/react'; // or any other type of storybook

addParameters({
  setDirectionKnob: true,
});
