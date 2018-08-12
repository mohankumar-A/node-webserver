const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

const app = express();

//set template engine
app.set("view engine", "hbs");


//user defined middle ware
app.use((req,res,next) => {
  
  const date = new Date().toString();
  const log = `Date: ${date} ${req.method} ${req.url} \n`;
  console.log(log);

  fs.appendFileSync(__dirname + "/server.log", log);
  //without next this wont completes the request
  next();
});

//maintanence middle ware
// app.use((req, res, next) => {
//   res.render("maintanence.hbs");
// });

//middleware with express static
app.use(express.static(__dirname + "/public"));

//template engine to register partials views
hbs.registerPartials(__dirname + "/views/partials");

//handlebar template engine helpers
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

//handlebar template engine helpers method
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send({
  //   name: "Mohan kumar",
  //   likes: ["Coding", "Music"]
  // });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    // currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome to my page"
  });
});

app.get("/about", (req,res) => {
  // res.send("<h1>About me</h1>");
  res.render("about.hbs", {
    pageTitle: "About Page",
    // currentYear: new Date().getFullYear()
  });
});

app.get("/project", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page"
  });
})

app.get("/error", (req, res) => {
  res.send({
    error: "Unable to fetch request"
  })
});

app.listen(port, () => {
  console.log(`server is up and running on ${port}`);
});