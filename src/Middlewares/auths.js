'use strict';

const { error } = require('../Views/message');

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