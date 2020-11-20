'use strict';

const { success, error } = require('../Views/message');
const { models }         = require('../Models');
const   controller       = require('../Controllers');

module.exports.getByCode = async function(req, res, next) {
	try {
		let code = req.params.code;
		let q = await controller.courses.getByCode(code);
		res.send(q);
		next();
	} catch (e) {
		res.send(error(""+e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body.content;
		let q = await controller.courses.create(content);
		res.send(q);
		next();
	} catch (e) {
		res.send(error(""+e));
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.params.id;
		let q = await controller.courses.del(id);
		res.send(q);
		next();
	} catch(e) {
		res.send(error(e+''));
	};
};


