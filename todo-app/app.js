const express = require("express");
var csrf = require("tiny-csrf");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_cheracter_long",["POST","PUT","DELETE"]))

const { Todo } = require("./models");

app.set("view engine", "ejs");

// GET all todos and render them
app.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.getTodo();
    if (req.accepts("html")) {
      return res.render("index", {
        allTodos,
        csrfToken: req.csrfToken(),
      });
    } else {
      return res.json({
        allTodos,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.use(express.static(path.join(__dirname, "public")));

// GET all todos in JSON format
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.setHeader("Content-Type", "application/json");
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// POST a new todo
app.post("/todos", async (req, res) => {
  console.log("Creating a todo", req.body);
  try {
    await Todo.addTodo({
      title: req.body.title,
      dueDate: req.body.dueDate,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// PUT: Mark a todo as completed
// put http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id", async (req, res) => {
  console.log("we have to update a todo woth ID:", req.params.id);
  const todo = await Todo.findByPk(req.params.id);

  try {
    const updatedTodo = await todo.markAsCompleted();
    return res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});
// DELETE a todo
app.delete("/todos/:id", async (req, res) => {
  console.log("Delete a todo by ID: ", req.params.id);
  try {
    await Todo.remove(req.params.id);
    return res.json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = app;
