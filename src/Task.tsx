import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo ((props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    },[props.task.id, props.todolistId]);

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.task.id, props.changeTaskTitle, props.todolistId]);

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
            />

            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})