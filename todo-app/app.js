const express = require("express");
const csrf = require("csurf");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"))
app.use(csrf({cookie : true }))


const { Todo } = require("./models");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const allTodos = await Todo.getTodo();
  if (req.accepts("html")) {
    res.render("index", {
      allTodos,
      csrfToken : req.csrfToken()
    });
  } else {
    res.json({
      allTodos,
    });
  }
  res.render("index");
});

app.use(express.static(path.join(__dirname, "public")));

// eslint-disable-next-line no-unused-vars
app.get("/todos", async (req, res) => {
  // res.send("Hello World!")
  // console.log("Todo list");
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.post("/todos", async (req, res) => {
  console.log("Creating a todo", req.body);
  //Todo
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

// put http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (req, res) => {
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

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", async (req, res) => {
  console.log("Delete a todo by ID: ", req.params.id);
  try {
    await Todo.remove(req.params.id);
    return res.json({ sucess:true})
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = app;
