import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {todoListID1} from "../../features/TodolistsList/tl-reducer";

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
    task: {id: '1', title: 'REACT', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low,
        startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''},
    todolistId: 'todolistId'
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
        startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''},
    todolistId: 'todolistId'
};

