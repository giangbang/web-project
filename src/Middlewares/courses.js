'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const   controller       = require('../Controllers');

module.exports.getByCode = async function(req, res, next) {
	try {
		let code = req.query.code;
		let q = await controller.courses.getByCode(code);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.getPoints = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.courses.getPoints(id);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.courses.getById(id);
		await res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
		let q = await controller.courses.create(content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.getPointByUser = async function(req, res, next) {
	try {
		let courseId = req.query.id;
    let userId = req.user.data.id;
		let q = await controller.courses.getPointByUser(userId, courseId);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.update = async function(req, res, next) {
	try {
		let content = req.body;
    let id = content.id;
		let q = await controller.courses.update(id, content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};


module.exports.del = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.courses.del(id);
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send((e+''));
	};
};

module.exports.getAll = async function(req, res, next) {
	try {
		let q = await controller.courses.getAll();
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send((e+''));
	};
};



