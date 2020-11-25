'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const   controller       = require('../Controllers');


module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
		let q = await controller.submissions.create(content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.params.id;
		let q = await controller.submissions.del(id);
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send((e+''));
	};
};

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.submissions.getById(id);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};

module.exports.getByUserAndQuiz = async function(req, res, next) {
	try {
		let userid = req.query.userId;
    let quizid = req.query.quizId;
		let q = await controller.submissions.getByUserAndQuiz(userid, quizid);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(e+'');
	}
};