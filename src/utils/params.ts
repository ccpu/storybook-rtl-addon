// import { API } from '@storybook/api';

export const getParamVal = (data: any, paramKey: string) => {
  if (!data || !('parameters' in data)) {
    return;
  }

  const { parameters } = data;

  return parameters[paramKey];
};
