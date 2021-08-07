import '../register';
import '@storybook/addon-knobs/dist/register';
import { addParameters } from '@storybook/react'; // or any other type of storybook
import { themes } from '@storybook/theming';
import addons from '@storybook/addons';
addons.setConfig({
  theme: themes.dark,
});

addParameters({
  setDirectionKnob: true,
});
