/* eslint-disable no-undef */
const todoList = require("../todo");
const  {all, markAsComplete, add} = todoList();

describe("Todolist test suite", () => {
    beforeAll(()=>{
        add({
            title: "Test todo",
            completed: false,
            dueDate:new Date().toISOString().slice(0, 10)
        });
    })
    test("Should add a new todo", () => {
        const todoListCount = all.length
        add({
            title: "Test todo",
            completed: false,
            dueDate:new Date().toISOString().slice(0, 10)
        });
        expect(all.length).toBe(todoListCount+1);  // Validate that the todo was added
    });
    test("Should mark todo as compelete", ()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);

    })
});

