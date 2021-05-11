import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}

export const todoListID1 = v1();
export const todoListID2 = v1();

let initialState: Array<TodolistDomainType> = [
    // {id: todoListID1, title: "What to learn", filter: "all"},
    // {id: todoListID2, title: "What to buy", filter: "all"}
]

export type ActionType = RemoveTodolistActionType | AddTodoListActionType |
    ChangeFilterActionType | ChangeTodoListTitleActionType

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}


export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            },
            ...state]
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
            //     todoList.title = action.title
            // }
            // return [...state]
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const ChangeFilterAC = (filter: FilterValueType, id: string): ChangeFilterActionType => {
    return { type: 'CHANGE-FILTER', id: id, filter: filter}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TITLE', title: title, id: id}
}