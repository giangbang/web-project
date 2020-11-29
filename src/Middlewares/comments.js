'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const   controller       = require('../Controllers');

module.exports.edit = async function(req, res, next) {
	try {
		let content = req.body.content;
    let id = req.body.id;
		let q = await controller.comments.edit(id, content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
    content.userId = req.user.data.id;
		let q = await controller.comments.create(content);
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send(""+e);
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.comments.del(id);
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send(error(e+''));
	};
};


