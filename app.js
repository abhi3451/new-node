const express = require("express");
const app = express();
const fs = require("fs");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  fs.readFile("username.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat found";
    }
    res.send(
      `${data}<form action="/" onSubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
        <input type="text"  id="message" name="message"/><br/>
        <input type="hidden"  id="username" name="username"/><br/>
         <button>Submit</button>
         </form>`
    );
  });
});
app.post("/", (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  fs.writeFile("username.txt", `${username}:${message}`, { flag: "a" }, (err) =>
    err ? console.log(err) : res.redirect("/")
  );
});

app.get("/login", (req, res, next) => {
  res.send(
    `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST">
      <input type="text" id="username" name="username"/> 
      <button>Add user</button></form>`
  );
});
app.post("/login", (req, res, next) => {
  res.redirect("/");
});

app.listen(4000);
