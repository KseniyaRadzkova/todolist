import {
    AddTodoListAC, ChangeTodoListTitleAC, RemoveTodolistAC,
    ChangeFilterAC, todoListReducer, TodolistDomainType, FilterValueType
} from './tl-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState === startState).toBeFalsy();
});


test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todoListReducer(startState, AddTodoListAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState === startState).toBeFalsy();
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = "completed";
    const action = ChangeFilterAC(newFilter, todolistId2);
    const endState = todoListReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



test('correct todolist should change its name', () => {
    let newTodoListTitle = "New Todolist";
    const action = ChangeTodoListTitleAC(todolistId2, newTodoListTitle)
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
});
