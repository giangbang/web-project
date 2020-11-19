'use strict'

if (process.env.NOVE_ENV !== 'production') {
	require('dotenv').config();
}

const express 			= require('express');
const session			= require('express-session');
const passport			= require('passport');
const routes 			= require('./src/Routes');
const {init} 			= require('./src/Models');
const controller		= require('./src/Controllers');
const app 				= express();

let _path = process.env.API_PATH || '';

app.use(express.json());
app.use(session({
	cookie: { maxAge: 60000 }, 
	secret: process.env.SESSION_SECRET || 'study',
	resave: false,
	saveUninitialized: false
}));
controller.passport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(_path+'/users', routes.userRouter);	
app.use(_path+'/quizzes', routes.quizRouter);
app.use(_path+'/courses', routes.courseRouter);
app.use(_path+'/tags', routes.tagRouter);
app.use(_path+'/comments', routes.commentRouter);
app.use(_path+'/submissions', routes.submissionRouter);



init().then(function() {
	app.listen(process.env.PORT, function() {
		console.log("App started, listening at port " + process.env.PORT);
	})
}).catch (e => {
	console.error("Cannot connect to database", e);
});