import React, {useState} from 'react';
import './App.css';
import TodoList from './Todolist';
import {v1} from "uuid";
import {strict} from "assert";
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType, TodoListType} from "./api/todolist-api";
import {FilterValueType, TodolistDomainType} from "./reducers/tl-reducer";
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}



function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), description: '', title: "HTML&CSS", status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''},
            {id: v1(), title: "JS", description: '', status: TaskStatuses.Completed, todoListId: todoListID1,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "ReactJS", description: '', status: TaskStatuses.New, todoListId: todoListID1,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "ReactJS", description: '', status: TaskStatuses.New, todoListId: todoListID1,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "ReactJS", description: '', status: TaskStatuses.New, todoListId: todoListID1,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''}
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", description: '', status: TaskStatuses.Completed, todoListId: todoListID2,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "Bread", description: '', status: TaskStatuses.Completed, todoListId: todoListID2,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "Beer", description: '', status: TaskStatuses.New, todoListId: todoListID2,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''},
            {id: v1(), title: "Meat", description: '', status: TaskStatuses.New, todoListId: todoListID2,
                startDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, addedDate: ''}
        ]
    })

    // functions for tasks:
    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(), title: taskTitle, description: '', status: TaskStatuses.New, priority: TaskPriorities.Low,
            startDate: '', deadline: '', todoListId: todoListID, order: 0, addedDate: ''
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})

        // const upDatedTasks = [newTask, ...tasks]
        // setTasks(upDatedTasks)
    }
    function changeStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    // functions for todoLists:
    function changeFilter(newFilterValue: FilterValueType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoListID, title: title, filter: "all", addedDate: '', order: 0
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    const ListTodos = todoLists.map((tl) => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
        }
        if (tl.filter === "completed") {
            taskForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
        }
        return (
            <Grid item key={tl.id} style={{padding: "15px"}}>
                <Paper elevation={10} style={{padding: "15px"}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
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
                    {ListTodos}
                </Grid>-+





            </Container>
        </div>
    );
}


export default App;
