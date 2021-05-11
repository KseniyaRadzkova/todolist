import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {AddTodoListAC, todoListID1, todoListID2} from "./tl-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", description: '', title: "HTML&CSS", status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''
            },
            {
                id: "2", title: "JS", description: '', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''
            },
            {
                id: "3", title: "React", description: '', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID1, order: 0, addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", description: '', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID2, order: 0, addedDate: ''
            },
            {
                id: "2", title: "milk", description: '', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID2, order: 0, addedDate: ''
            },
            {
                id: "3", title: "tea", description: '', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todoListID2, order: 0, addedDate: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});


test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", "juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("juce");
    expect(endState['todolistId1'][1].title).toBe("JS");
});


test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
