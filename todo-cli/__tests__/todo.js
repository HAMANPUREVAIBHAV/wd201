// /* eslint-disable no-undef */
// const todoList = require("../todo");
// const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

// const formattedDate = d => {
//     return d.toISOString().split("T")[0]
//   }

// var dateToday = new Date()
// const today = formattedDate(dateToday)
// const yesterday = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() - 1))
// )
// const tomorrow = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() + 1))
// )

// describe("Todolist test suite", () => {
//     beforeAll(()=>{
//         add({
//             title: "Test todo today",
//             completed: false,
//             dueDate:today
//         });

//         add({
//             title: "Test todo yesderday",
//             completed: false,
//             dueDate:yesterday
//         });

//         add({
//             title: "Test todo tommorow",
//             completed: false,
//             dueDate:tomorrow
//         });

//     })
//     //test that checks creating a new todo.
//     test("Should add a new todo", () => {
//         const todoListCount = all.length
//         add({
//             title: "Test todo",
//             dueDate:new Date().toISOString().slice(0, 10),
//             completed: false
//         });
//         expect(all.length).toBe(todoListCount+1);  // Validate that the todo was added
//         all.pop();
//     });
//     //checks marking a todo as completed.
//     test("Should mark todo as compelete", ()=>{
//         expect(all[0].completed).toBe(false);
//         markAsComplete(0);
//         expect(all[0].completed).toBe(true);

//     });
//     //checks retrieval of overdue items.
//     test("retrival of overdue items",()=>{
//         var overdueList = [];
//         expect(overdueList.length).toBe(0);
//         overdueList = overdue();
//         expect(overdueList.length).toBe(1); 
//     });
//     //checks retrieval of due today items.
//     test("retrieval of due today items.",()=>{
//         var dueTodayList = [];
//         expect(dueTodayList.length).toBe(0);
//         dueTodayList = dueToday();
//         expect(dueTodayList.length).toBe(1); 
//     });
//     //checks retrieval of due later items.
//     test("retrieval of due later items.",()=>{
//         var dueLaterList = [];
//         expect(dueLaterList.length).toBe(0);
//         dueLaterList = dueLater();
//         expect(dueLaterList.length).toBe(1); 
//     });

// });

// __tests__/todo.js
/* eslint-disable no-undef */
const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
