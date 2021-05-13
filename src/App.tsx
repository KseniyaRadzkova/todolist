import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from './Todolist';
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodosTC,
    ChangeFilterAC,
    changeTodosTitleTC, FilterValueType,
    removeTodosTC, SetTodosTC, TodolistDomainType,
} from "./reducers/tl-reducer";
import {
    addTaskTC,
    changeTaskTitleAC,
    removeTaskTC, updateTaskStatusTC
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    useEffect(() => {
        dispatch(SetTodosTC())
    }, [])


    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // functions for tasks:
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let thunk = removeTaskTC(taskID, todoListID)
        dispatch(thunk)

        // const todoListTasks = tasks[todoListID]
        // tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        // setTasks({...tasks})
    }, [dispatch])
    const addTask = useCallback ((taskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, taskTitle))
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
    const changeStatus = useCallback ((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(todolistId, taskId, status))
        // const todoListTasks = tasks[todoListID]
        // const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasks})
        // }
    },[dispatch])
    const changeTaskTitle = useCallback ((taskID: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistId))
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
        // let action = RemoveTodolistAC(todoListID)
        // dispatch(action)

        dispatch(removeTodosTC(todoListID))


        // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        // delete tasks[todoListID]
        // setTasks({...tasks})tasks
    },[dispatch])
    const addTodoList = useCallback ((title: string) => {
        dispatch(addTodosTC(title))
        // const newTodoListID = v1()
        // const newTodoList: TodoListType = {
        //     id: newTodoListID, title: title, filter: "all"
        // }
        // setTodoLists([newTodoList, ...todoLists])
        // setTasks({...tasks, [newTodoListID]: []})
    },[dispatch])
    const changeTodoListTitle = useCallback ((todoListID: string, title: string) => {
        // dispatch(ChangeTodoListTitleAC(title, todoListID))
        dispatch(changeTodosTitleTC(todoListID, title))
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
                </Grid>

            </Container>
        </div>
    );
}


export default App;
