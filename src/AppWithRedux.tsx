import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from './Todolist';
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueType = "all" | "active" | "completed"

function AppWithRedux() {
    const dispatch = useDispatch()

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // functions for tasks:
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)

        // const todoListTasks = tasks[todoListID]
        // tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        // setTasks({...tasks})
    }, [dispatch])
    const addTask = useCallback ((taskTitle: string, todoListID: string) => {
        dispatch(addTaskAC(taskTitle, todoListID))
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: taskTitle,
        //     isDone: false
        // }
        // const todoListTasks = tasks[todoListID]
        // tasks[todoListID] = [newTask, ...todoListTasks]

        // setTasks({...tasks})

        // const upDatedTasks = [newTask, ...tasks]
        // setTasks(upDatedTasks)
    },[dispatch])
    const changeStatus = useCallback ((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        // const todoListTasks = tasks[todoListID]
        // const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
    },[dispatch])
    const changeTaskTitle = useCallback ((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
        // const todoListTasks = tasks[todoListID]
        // const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        // if (task) {
        //     task.title = title
        //     setTasks({...tasks})
        // }
    },[dispatch])

    // functions for todoLists:
    const changeFilter = useCallback ((newFilterValue: FilterValueType, todoListID: string) => {
        dispatch(ChangeFilterAC(newFilterValue, todoListID))
        // const todoList = todoLists.find(tl => tl.id === todoListID)
        // if (todoList) {
        //     todoList.filter = newFilterValue
        //     setTodoLists([...todoLists])
        // }
    },[dispatch])
    const removeTodoList = useCallback ((todoListID: string) => {
        let action = RemoveTodolistAC(todoListID)
        dispatch(action)
        dispatch(action)
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        // delete tasks[todoListID]
        // setTasks({...tasks})tasks
    },[dispatch])
    const addTodoList = useCallback ((title: string) => {
        dispatch(AddTodoListAC(title))
        // const newTodoListID = v1()
        // const newTodoList: TodoListType = {
        //     id: newTodoListID, title: title, filter: "all"
        // }
        // setTodoLists([newTodoList, ...todoLists])
        // setTasks({...tasks, [newTodoListID]: []})
    },[dispatch])
    const changeTodoListTitle = useCallback ((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
        // const todoList = todoLists.find(tl => tl.id === todoListID)
        // if (todoList) {
        //     todoList.title = title
        //     setTodoLists([...todoLists])
        // }
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}} >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4} >
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
                    })}
                </Grid>-+

            </Container>
        </div>
    );
}


export default AppWithRedux;