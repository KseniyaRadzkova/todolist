import {
    AddTodoListActionType,
    RemoveTodolistActionType,
    SetTodosActionType,
} from "./tl-reducer";
import {TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../App";
import {AppRootStateType} from "../state/store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}
let initialState: TasksStateType = {
    // [todoListID1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "ReactJS", isDone: false}
    // ],
    // [todoListID2]: [
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "Bread", isDone: true},
    //     {id: v1(), title: "Beer", isDone: false},
    //     {id: v1(), title: "Meat", isDone: false},
    // ]
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case "SET-TODOS": {
            let copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case "REMOVE-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.task.todoListId];
            const newTasks = [action.task, ...todolistTasks]
            copyState[action.task.todoListId] = newTasks;
            return copyState;
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state})
            // let copyState = {...state}
            // let todolistTasks = copyState[action.todolistId];
            // let task = todolistTasks.find(t => t.id === action.taskId)
            // if (task) {
            //     task.title = action.title
            // }
            // return {
            //     ...state,
            //     [action.todolistId]: state[action.todolistId].map(task => {
            //         if (task.id === action.taskId) {
            //             return {...task, title: action.title}
            //         } else {
            //             return task
            //         }
            //     })
            // }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
        // throw new Error("I don't understand this type")
    }
}
// actions

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>


// thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                let tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, taskTitle)
        .then((res) => {
            let newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
        })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let state = getState();
    let allTasks = state.tasks;
    let tasksForCurrentTodolist = allTasks[todolistId]
    const findTask = tasksForCurrentTodolist.find((t) => {
        return t.id === taskId
    })

    if (findTask) {
        const model: UpdateTaskModelType = {
            title: findTask.title,
            status: status,
            startDate: findTask.startDate,
            priority: findTask.priority,
            description: findTask.description,
            deadline: findTask.deadline
        }

        todolistApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                let updatedTaskStatus = res.data.data.item.status
                dispatch(changeTaskStatusAC(taskId, updatedTaskStatus, todolistId))
            })
    }
}