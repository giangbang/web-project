'use strict'

const controller = require('../Controllers');

module.exports.getInfo = (req, res) => {
	let code = req.params.code;
	controller.students.getByCode(code)
	.then(d => {
		res.send(d);
	}).catch(e => {
		res.send(e);
	});
};

module.exports.create = (req, res) => {
	let content = req.body;
	controller.students.create(content)
	.then(d => {
		res.send(d);
	}).catch(e => {
		res.send(e);
	});
};