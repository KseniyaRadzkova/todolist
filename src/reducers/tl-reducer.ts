import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type changeFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
type changeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}
export type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    changeFilterActionType | changeTodoListTitleActionType


export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-FILTER": {
            // const todoList = state.find(tl => tl.id === action.id)
            // if (todoList) {
            //     todoList.filter = action.filter
            //     return [...state]
            // }
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            // const todoList = state.find(tl => tl.id === action.id)
            // if (todoList) {
            //     todoList.title = action.filter
            //     return [...state]
            // }
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
    return [...state]
}