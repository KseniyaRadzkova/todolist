import {v1} from "uuid";
import {todolistApi, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";

export const todoListID1 = v1();
export const todoListID2 = v1();

let initialState: Array<TodolistDomainType> = [
    // {id: todoListID1, title: "What to learn", filter: "all"},
    // {id: todoListID2, title: "What to buy", filter: "all"}
]

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist,filter: "all",}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case "SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const AddTodoListAC = (todolist: TodoListType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeFilterAC = (filter: FilterValueType, id: string) => ({type: 'CHANGE-FILTER', id, filter} as const)
export const ChangeTodoListTitleAC = (todolistId: string, title: string) => ({type: 'CHANGE-TITLE', todolistId, title} as const)
export const setTodosAC = (todos: Array<TodoListType>) => ({type: 'SET-TODOS', todos} as const)


// thunks

export const SetTodosTC = () => (dispatch: Dispatch<ActionType>, getState: any): void => {
    todolistApi.getTodos()
        .then( (res) => {
            dispatch(setTodosAC(res.data))
        })
}

export const removeTodosTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.deleteTodo(todolistId)
        .then( (res) => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}

export const addTodosTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.createTodo(title)
        .then( (res) => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}

export const changeTodosTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.updateTodoTitle(todolistId, title)
        .then( (res) => {
            dispatch(ChangeTodoListTitleAC(todolistId, title))
        })
}

// types
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>;
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;
export type SetTodolistActionType = ReturnType<typeof setTodosAC>;
export type ActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeFilterAC>
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof setTodosAC>

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}