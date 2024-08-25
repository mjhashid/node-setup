const express = require("express");
const app = express();
const Joi = require("joi");
// const morgan = require("morgan");
// const helmet = require("helmet");

app.use(express.json());
// app.use(helmet());
// app.use(morgan("tiny"));

const courses = [
  { id: 1, name: "Data Structure and Algorithm", code: "COSC301" },
  { id: 2, name: "Introduction to System Programming", code: "COSC311" },
  { id: 3, name: "Database and Management System", code: "COSC309" },
];

// Using GET METHOD for our Home page..

app.get("/", (req, res) => {
  res.send(
    '<h1>Your are Welcome to our Home page..</h1> <p>Search using this url "http://localhost:4000/api/courses" to view the available courses..</p>'
  );
});

// Displaying the given courses..

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Validating the courses if they exist..

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found.");
});

// Using POST METHOD to create the courses..

app.post("/api/courses", (req, res) => {
  // creating a schema using JOI
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    code: req.body.code,
  };

  courses.push(course);
  res.send(course);
});

// Updating the courses Using PUT METHOD..

app.put("/api/courses/:id", (req, res) => {
  // checking if the specified ID exist
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found.");

  // Updating
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update
  course.name = req.body.name;
  course.code = req.body.code;
  res.send(course);
});

// DELETE METHOD..
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found.");

  // delete

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
    code: Joi.string().min(7).max(7).required(),
  };
  return Joi.validate(course, schema);
}

const port = 5000;

app.listen(port, () => console.log(`You are listening to port ${port}`));
