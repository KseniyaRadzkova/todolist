import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import App from "../../App";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/ App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <Provider store={store}>
    <App {...args} />
</Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};

