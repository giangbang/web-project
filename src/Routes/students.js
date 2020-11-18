'use strict'

const express = require('express');
const router = express.Router();

const handler = require('../Middlewares');

//create new student in database
router.post('/new', handler.students.create);

// get user info by student's code
router.get('/get/:code', handler.students.getInfo);

module.exports = router;