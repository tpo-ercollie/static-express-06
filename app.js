// Import Express and set up the app, this inits the app
const express = require('express');
const path = require('path');

// Create variable to link the data.json file
const { projects } = require('../static-express-06/data.json');

const app = express();

// Load view engine to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static middleware - static files (like css, images) don't need to be processed by the app, they just need to be sent to the browser
app.use('/static', express.static('public')); // express.static is a piece of middleware to call the public files

/* /Routes */

// index route
// getting all data.json info, locals set to data.projects
app.get('/', function (req, res, next) {
  // passing all project data to index pug template
  res.render('index', { projects });
});

// about route
app.get('/about', function (req, res) {
  res.render('about');
});

// sent all available data for projects to project pug template
app.get('/projects/:id', function (req, res, next) {
  const projectId = projects[req.params.id - 1]; // minus one because the data.json array is 0 based
  const project = projects.find(({ id }) => id === +projectId);

  if (project) {
    res.render('project', { project });
  } else {
    res.sendStatus(404);
  }
});

// /////Erorrs

// Import 404 and global error handlers

// Pass route handlers to the app

// Pass 404 and global error handlers to the app

// Activate the port, set up the listen function to start the server
app.listen(3000, function () {
  console.log('server is activated on port 3000');
});

// app.get('/layout', function (req, res) {
//     res.render('layout')
//   })


