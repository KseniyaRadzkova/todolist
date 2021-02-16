import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


function TodoList(props: PropsType) {
    const addTask = (title: string) => {props.addTask(title, props.id)}
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const all = () => props.changeFilter("all", props.id)
    const active = () => props.changeFilter("active", props.id)
    const completed = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>)=> {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />

                {/*<input type="checkbox" checked={t.isDone}*/}
                {/*onChange={changeStatus}*/}
                {/*/>*/}
                <EditableSpan title={t.title} changeItem={changeTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
                {/*<button onClick={removeTask}>X</button>*/}
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>

                {/*<button onClick={() => {props.removeTodoList(props.id)}}>x</button>*/}
            </h3>
            <AddItemForm addItem={addTask} />
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    size="small"
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant ="contained"
                    onClick={all}>All
                </Button>
                <Button
                    size="small"
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant ="contained"
                    onClick={active}>Active
                </Button>
                <Button
                    size="small"
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant ="contained"
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;