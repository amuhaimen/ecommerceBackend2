require("dotenv").config();
const express = require("express");
const app = express();

const Task = require("./model/taskSchema");
const dbConnection = require("./config/dbConfig");

app.use(express.json());

dbConnection();

//================== create data with app.post method ======================
app.post("/createtask", function (req, res) {
  let { title, priority } = req.body;
  let task = new Task({
    title: title,
    priority: priority,
  });

  task.save();
  res.send({ success: "data created" });
  //   res.send("Hello World");
});

//================== read or get data with app.get method ======================
app.get("/createtask", async function (req, res) {
  let data = await Task.find({});
  res.send(data);
});

//================== update  data with app.post method ======================
app.post("/edittask", async function (req, res) {
  let { id, title } = req.body;
  await Task.findByIdAndUpdate({ _id: id }, { title: title });
  res.send("data updated");
  console.log(id, title);
});

//================== delete  data with app.post method ======================
app.post("/deletetask", async function (req, res) {
  let { id } = req.body;
  await Task.findByIdAndDelete({ _id: id });
});

app.listen(8000, function () {
  console.log("server is running");
});

//Cxx45hFHHzG7t5Ir
//mernmuhaimen2202
