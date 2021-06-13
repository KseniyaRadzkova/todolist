import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodosTC,
    ChangeFilterAC, changeTodosTitleTC,
    FilterValueType,
    removeTodosTC,
    SetTodosTC,
    TodolistDomainType
} from "./tl-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../../components/AddItemForm/addItemForm";
import TodoList from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {
    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SetTodosTC())
    }, [])

    // functions for tasks:
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let thunk = removeTaskTC(taskID, todoListID)
        dispatch(thunk)
    }, [dispatch])
    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, taskTitle))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskID, todolistId, {title}))
    }, [dispatch])

    // functions for todoLists:
    const changeFilter = useCallback((newFilterValue: FilterValueType, todoListID: string) => {
        dispatch(ChangeFilterAC(newFilterValue, todoListID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodosTC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodosTitleTC(todoListID, title))
    }, [dispatch])

    return <>
        <Grid container style={{padding: "15px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4}>
            {
                todoLists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    return (
                        <Grid item key={tl.id} style={{padding: "15px"}}>
                            <Paper elevation={10} style={{padding: "15px"}}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}