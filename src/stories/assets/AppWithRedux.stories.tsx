import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import AppWithRedux from "../../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/ AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <Provider store={store}>
    <AppWithRedux {...args} />
</Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};

