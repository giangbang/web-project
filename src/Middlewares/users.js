'use strict';

const controller         = require('../Controllers');
const { success, error } = require('../Views/message');

module.exports.getByName = async function(req, res, next) {
	try {
		let name = req.params.name;
		let q = await controller.users.getByName(name);
		res.send(q);
		next();
	} catch (e) {
		res.send(error(""+e));
	}
};

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.params.id;
		let q = await controller.users.getById(id);
		res.send(q);
		next();
	} catch (e) {
		res.send(error(""+e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
		content.password = await controller.auth.encrypt(content.password);
		let q = await controller.users.create(content);
		res.send(q);
		next();
	} catch(e) {
		res.status(500).send(error(e));
	};
};
