import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodolistActionType, todoListID1, todoListID2} from "./tl-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
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


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let copyState = {...state}
            let task:TaskType  = {id: v1(), title: action.title, status: TaskStatuses.New, description: '',
                startDate: '', deadline: '', todoListId: action.todolistId, addedDate: '', order: 0, priority: TaskPriorities.Low};
            let todolistTasks = copyState[action.todolistId];
            copyState[action.todolistId] = [task, ...todolistTasks];
            return copyState;
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, status: action.status } : t);

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
                [action.todolistId]: []
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}