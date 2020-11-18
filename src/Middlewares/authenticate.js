'use strict'

const { error } = require('../Views/message');

module.exports.authenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.send(error("You must log in first"));
}