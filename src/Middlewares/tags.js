'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const controller         = require('../Controllers');

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.tags.getById(id);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((e));
	}
};

module.exports.getByCourse = async function(req, res, next) {
	try {
    let courseId = req.query.id;
		let q = await controller.tags.getByCourse(courseId);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports.getAll = async function(req, res, next) {
	try {
		let q = await controller.tags.getAll();
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
		let q = await controller.tags.create(content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((e));
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.tags.del(id);
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send((e));
	};
};
