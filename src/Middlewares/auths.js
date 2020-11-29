'use strict';

const { error }   = require('../Views/message');
const controller  = require('../Controllers');

module.exports.authenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else res.status(403).send(("You must log in first"));
}

module.exports.loginFail = (req, res, next) => {
  res.status(401).send("Password or Username is incorrect");
}

module.exports.loginSucceed = (req, res, next) => {
  next();
}

module.exports.userVerify = function(req, res, next) {
	if (req.isAuthenticated()) {
    let user = req.user.data.dataValues;
    let id = req.query.id || req.body.id;
    if (user.admin || (user.id == id)) 
      return next();
    res.status(403).send('Unauthorized');
	}
	else res.status(403).send(("You must log in first"));
}

module.exports.submissionVerify = async function(req, res, next) {
	if (req.isAuthenticated()) {
    let user = req.user.data.dataValues;
    let id = req.query.id || req.body.id;
    let user_found = await controller.submissions.getById(id);
    if (user_found.status != 200) {
      res.status(404).send('Not found');
      return ;
    }
    if (user.admin || (user.id == user_found.data.userId)) 
      return next();
    res.status(403).send('Unauthorized');
	}
	else res.status(403).send(("You must log in first"));
}

module.exports.commentVerify = async function(req, res, next) {
	if (req.isAuthenticated()) {
    let user = req.user.data;
    let id = req.query.id || req.body.id;
    let user_found = await controller.comments.getById(id);
    if (user_found.status != 200) {
      res.status(404).send('Not found');
      return ;
    }
    if (user.admin || (user.id == user_found.data.userId)) 
      return next();
    res.status(403).send('Unauthorized');
	}
	else res.status(403).send(("You must log in first"));
}

module.exports.administrator = function(req, res, next) {
	if (req.isAuthenticated()) {
    let user = req.user.data;
    if (user.admin) 
      return next();
    res.status(403).send('Unauthorized!');
	}
	else res.status(403).send(("You must log in first"));
}