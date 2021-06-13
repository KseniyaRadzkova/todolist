import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import AddItemForm, {AddItemFormPropsType} from "./addItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action('Button inside form clicked'),
};

