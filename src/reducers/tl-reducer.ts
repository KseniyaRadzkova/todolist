import {v1} from "uuid";
import {todolistApi, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    todolist: TodoListType
}
type ChangeFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    todolistId: string
}

export const todoListID1 = v1();
export const todoListID2 = v1();

let initialState: Array<TodolistDomainType> = [
    // {id: todoListID1, title: "What to learn", filter: "all"},
    // {id: todoListID2, title: "What to buy", filter: "all"}
]

export type ActionType = RemoveTodolistActionType | AddTodoListActionType |
    ChangeFilterActionType | ChangeTodoListTitleActionType | SetTodosActionType

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}


export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            })
        }
        case "ADD-TODOLIST": {
            return [{
                ...action.todolist,
                filter: "all",
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
                if (tl.id === action.todolistId) {
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
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodoListAC = (todolist: TodoListType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const ChangeFilterAC = (filter: FilterValueType, id: string): ChangeFilterActionType => {
    return {type: 'CHANGE-FILTER', id: id, filter: filter}
}
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TITLE', todolistId, title}
}
export const setTodosAC = (todos: Array<TodoListType>) => {
    return {type: 'SET-TODOS', todos} as const
}

export type SetTodosActionType = ReturnType<typeof setTodosAC>


// thunks

export const SetTodosTC = () => (dispatch: Dispatch, getState: any): void => {
    todolistApi.getTodos()
        .then( (res) => {
            let todos = res.data
            dispatch(setTodosAC(todos))
        })
}

export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todolistId)
        .then( (res) => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}

export const addTodosTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then( (res) => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}

export const changeTodosTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodoTitle(todolistId, title)
        .then( (res) => {
            dispatch(ChangeTodoListTitleAC(todolistId, title))
        })
}