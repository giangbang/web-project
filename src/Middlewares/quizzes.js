'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const   controller       = require('../Controllers');

module.exports.getAll = async function(req, res, next) {
	try {
		let q = await controller.quizzes.getAll();
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getByTag = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.quizzes.getByTag(id);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.quizzes.getById(id);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
		let q = await controller.quizzes.create(content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.quizzes.del(id);
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send(e+'');
	};
};


