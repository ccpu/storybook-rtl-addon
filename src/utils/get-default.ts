import { DIRECTION_PARAM_KEY } from '../constants';
import { StoryContext } from '@storybook/addons';
import { getParamVal } from './params';

export const getDefault = (data?: StoryContext) => {
  if (!data) return 'ltr';
  const defaultLocale = getParamVal(data, DIRECTION_PARAM_KEY);
  return defaultLocale || 'ltr';
};
