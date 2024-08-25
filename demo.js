const express = require("express");
const Joi = require("joi");

const app = express();

// Converting to json Object..
app.use(express.json());

const courses = [
  { id: 1, name: "Data Structure and Algorithm" },
  { id: 2, name: "Introduction to System Programming" },
  { id: 3, name: "Introduction to Web development" },
];

//Our Home page for GET Method..
app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to my Node tutorial</h1><p>Search the url by typing "localhost:3000/api/courses" to view all the courses entered.</p> '
  );
});

// GET Method..
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Validating POST Method..

app.post("/api/courses", (req, res) => {
  // Validating with Joi EndPoint...
  //initial validation using joi
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };
  // const result = Joi.validate(req.body, schema);
  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validating input if.
  // if (!req.body.name) {
  //   res.status(400).send('"name" is required');
  //   return;
  // }

  // if (req.body.name.length < 3) {
  //   res.status(400).send('"name" should not be a minimum of 3 characters');
  //   return;
  // }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Validating GET Method along side with Using Params..

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

// Updating the course Using PUT Method..

app.put("/api/courses/:id", (req, res) => {
  // Look up the course with the given Id
  // if NOT exitsting , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Validation
  // If invalid, return 400- Bad request
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };
  // const result = Joi.validate(req.body, schema);

  // distructuring the properties

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

// DELETE METHOD..
app.delete("/api/courses/:id", (req, res) => {
  //checking the given id.
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found.");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Returning the responds

  res.send(course);
});

//Function Handler for validating the PUT METHOD.
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`You are listening to port ${port}...`));
