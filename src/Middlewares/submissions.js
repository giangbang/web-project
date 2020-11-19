'use strict';

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');
const controller		 = require('../Controllers');


module.exports.create = async function(req, res, next) {
	try {
		let content = req.body.content;
		let q = await controller.submissions.create(content);
		res.send(q);
		next();
	} catch (e) {
		res.send(error(""+e));
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.body.id;
		let q = await controller.submissions.del(id);
		res.send(q);
		next();
	} catch(e) {
		res.send(error(e+''));
	};
};


