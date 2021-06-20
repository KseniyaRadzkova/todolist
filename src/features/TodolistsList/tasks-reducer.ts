import {
    AddTodoListActionType,
    RemoveTodolistActionType, SetTodolistActionType,
} from "./tl-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET-TODOS": {
            let copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}
// actions

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "REMOVE-TASK", taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTask(todolistId, taskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let newTask = res.data.data.item
                dispatch(addTaskAC(newTask))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        let state = getState();
        const findTask = state.tasks[todolistId].find(t => t.id === taskId)

        if (!findTask) {
//throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: findTask.title,
            status: findTask.status,
            startDate: findTask.startDate,
            priority: findTask.priority,
            description: findTask.description,
            deadline: findTask.deadline,
            ...model
        }
        dispatch(setAppStatusAC('loading'))
        todolistApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, model, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// types

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
