// Import Express and set up the app, this inits the app
const express = require('express');
const path = require('path');

// Create variable to link the data.json file
const { projects } = require('./data.json');

const app = express();

// Load view engine to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static middleware - static files (like css, images) don't need to be processed by the app, they just need to be sent to the browser
app.use('/static', express.static('public')); // express.static is a piece of middleware to call the public files

/* /Routes */

// index route: getting all data.json info, locals set to data.projects
app.get('/', function (req, res, next) {
  // passing all project data to index pug template
  res.render('index', { projects });
});

// about route
app.get('/about', function (req, res) {
  res.render('about');
});

// sent all available data for projects to project pug template
app.get('/projects/:id', function (req, res, next) { // ':id" is a placeholder
  const projectId = parseInt(req.params.id);
  const project = projects[projectId];

  if (project) {
    console.log(project);
    res.render('project', { project });
  } else {
    next();
  }
});

/* Handle Errors */

// 404 handler to catch any underfined or non-existent route requests
app.use((req, res, next) => {
  console.log('404 error handler called');
  const err = new Error();
  err.status = 404;
  err.message = "Sorry, the project you're looking for doesn't exist.";
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err) { // checking for the err status
    console.log('Global error handler called', err);
  }

  if (err.status === 404) {
    res.status(404).render('not-found', { err });
  } else {
    err.message = err.message || "Oh no, something isn't right here";
    res.status(err.status || 500).render('error', { err });
  }
});

// Activate the port, set up the listen function to start the server
app.listen(3000, function () {
  console.log('server is activated on port 3000');
});

// app.get('/layout', function (req, res) {
//     res.render('layout')
//   })
