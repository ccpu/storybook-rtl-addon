import * as React from 'react';
import addons, { types } from '@storybook/addons';
import Tool from './Tool';
import { ADDON_ID } from './constants';

const PARAM_KEY = 'rtl-addon';
const TOOL_ID = `${ADDON_ID}/tool`;

addons.register(ADDON_ID, api => {
  addons.add(TOOL_ID, {
    paramKey: PARAM_KEY,
    render: () => <Tool api={api} />,
    title: 'Set page direction',
    type: types.TOOL
  });
});
