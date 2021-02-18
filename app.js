const express = require('express')
const router = express.Router()
const { projects } = require('..data.json')

 /* Home Page */
router.get('/', function(req, res, next) {
    // passing project info to the 'index' pug
    res.render('index'. { projects });
});

