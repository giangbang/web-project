'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

const handler = require('../Middlewares');

// get user info by username
router.get('/getbyName/:name', handler.users.getUserByName);

// create new user in database
router.post('/new', handler.users.create);

// login
router.get("/login", (req,res)=>{res.send({message:"Fail"})})
router.get("/loginOK" ,(req,res)=>{res.send({message: "Ok"})})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  function(req, res) {
    res.redirect('/users/loginOK');
  });



module.exports = router;
