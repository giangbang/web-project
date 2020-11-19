'use strict'

if (process.env.NOVE_ENV !== 'production') {
	require('dotenv').config();
	console.log("true")
}

const express 			= require('express');
const path				= require('path');
const routes 			= require('./src/Routes');
const {init} 			= require('./src/Models');
const controller		= require('./src/Controllers');
const app 				= express();

let _path = '';

app.use(express.json());
app.use(_path+'/users', routes.userRouter);	
app.use(_path+'/quizzes', routes.quizRouter);
app.use(_path+'/courses', routes.courseRouter);
app.use(_path+'/tags', routes.tagRouter);
app.use(_path+'/comments', routes.commentRouter);


init().then(function() {
	app.listen(process.env.PORT, function() {
		console.log("App started, listening at port " + process.env.PORT);
	})
}).catch (e => {
	console.error("Cannot connect to database", e);
});