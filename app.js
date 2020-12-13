'use strict'

if (process.env.NOVE_ENV !== 'production') {
	require('dotenv').config();
}

const express     = require('express');
const session	    = require('express-session');
const passport	  = require('passport');
const routes 	    = require('./src/Routes');
const {init} 	    = require('./src/Models');
const controller  = require('./src/Controllers');
const cors        = require('cors');
const app         = express();

app.use(cors({credentials: true, origin: process.env.HOST}));
app.use(express.json());
app.use(session({
	cookie: { maxAge: 36000000 }, 
	secret: process.env.SESSION_SECRET || 'study',
	resave: false,
	saveUninitialized: false
}));

controller.passport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.userRouter);	
app.use(routes.quizRouter);
app.use(routes.courseRouter);
app.use(routes.commentRouter);
app.use(routes.submissionRouter);
app.use(routes.testCaseRouter);
app.use(routes.tagRouter);
app.use(routes.hackerEarth);

init().then(function() {
	app.listen(process.env.PORT, function() {
		console.log("App started, listening at port " + process.env.PORT);
	})
}).catch (e => {
	console.error("Cannot connect to database", e);
});