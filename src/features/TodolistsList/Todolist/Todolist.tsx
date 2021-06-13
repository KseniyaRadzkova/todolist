import React, {useCallback, useEffect} from 'react';
import AddItemForm from "../../../components/AddItemForm/addItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValueType} from "../tl-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useDispatch} from "react-redux";


// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export const TodoList = React.memo((props: PropsType) => {
    const addTask = useCallback((title: string) => {props.addTask(title, props.id)}, [props.addTask, props.id])
    const changeTodoListTitle = useCallback ((title: string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])
    const removeTodoList = () => props.removeTodoList(props.id)

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const all = useCallback (() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const active = useCallback (() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const completed = useCallback (() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])


    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }



    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask} />
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {
                    tasksForTodolist.map(t => <Task
                    task={t}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                    />)}
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
})

export default TodoList;