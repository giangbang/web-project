'use strict'

if (process.env.NOVE_ENV !== 'production') {
	require('dotenv').config();
	console.log("true")
}

const express 	= require('express');
const flash 	= require('express-flash');
const session	= require('express-session');
const passport	= require('passport');

let route_path = './src/Routes/'

const userRouter 		= require(route_path+'users');
const studentRouter 	= require(route_path+'students');
const quizRouter 		= require(route_path+'quizzes');
const courseRouter 		= require(route_path+'courses');
const tagRouter 		= require(route_path+'tags');
const commentRouter 	= require(route_path+'comments');
const path				= require('path');

const {init} 	= require('./src/Models');
const controller= require('./src/Controllers');
const app 		= express();
app.use(session({
	cookie: { maxAge: 60000 }, 
	secret: process.env.SESSION_SECRET || 'woot',
	resave: false,
	saveUninitialized: false
}));
let _path = '';
controller.passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(_path+'/users', userRouter);	
app.use(_path+'/students', studentRouter);
app.use(_path+'/quizzes', quizRouter);
app.use(_path+'/courses', courseRouter);
app.use(_path+'/tags', tagRouter);
app.use(_path+'/comments', commentRouter);


init().then(function() {
	app.listen(process.env.PORT, function() {
		console.log("App started, listening at port " + process.env.PORT);
	})
}).catch(e => {
	console.error("Cannot connect to database", e);
});