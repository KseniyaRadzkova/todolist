import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../../Task";

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;
let removeTask = action ('Change status')
let changeStatus = action ('Change title')
let changeTaskTitle = action ('Remove task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

let baseArgs = {
    removeTask,
    changeStatus,
    changeTaskTitle
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: true},
    todolistId: 'todolistId'
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: false},
    todolistId: 'todolistId'
};

