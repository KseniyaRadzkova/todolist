import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f69e5e8d-f915-47ef-8e8f-68cb611269c1'
    }
})

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTaskResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>(`todo-lists`, {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<Array<GetTaskResponseType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string){
        return instance.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks${taskId}`, model)
    }
}