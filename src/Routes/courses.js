'use strict'

const express = require('express');
const router = express.Router();

const handler = require('../Middlewares');

// get quizzes list by courses's id
router.get('/:id', handler.courses.getByID);

// create new course to database
router.post('/new', handler.courses.create);

// list all courses
router.get('/', handler.courses.get);

module.exports = router;