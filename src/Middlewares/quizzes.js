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

module.exports.getHighestPoint = async function(req, res, next) {
	try {
		let quizid = req.query.id;
		let q = await controller.quizzes.getHighestPoint(quizid, 10);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getAllquizzesWithPointOfUser = async function(req, res, next) {
	try {
    let userid = req.user.data.id;
		let q = await controller.quizzes.getAllquizzesWithPointOfUser(userid);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getUsersPoint = async function(req, res, next) {
	try {
		let quizid = req.query.id;
    let userid = req.user.data.id;
		let q = await controller.quizzes.getUsersPoint(userid, quizid);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getByCourse = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.quizzes.getByCourse(id);
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

module.exports.update = async function(req, res, next) {
  try {
		let quiz = req.body;
    let id = quiz.id;
		let q = await controller.quizzes.update(id, quiz);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
}

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


