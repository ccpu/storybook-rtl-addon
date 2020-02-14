import addons, { makeDecorator } from '@storybook/addons';
import { Direction_MODE_EVENT_NAME } from './constants';

const withDirection = makeDecorator({
  name: 'withDirection',
  parameterName: 'direction',
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();
    channel.on(Direction_MODE_EVENT_NAME, dir => {
      document.body.dir = dir;
    });

    return getStory(context);
  }
});

export { withDirection };
