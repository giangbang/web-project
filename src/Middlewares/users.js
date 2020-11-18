'use strict'

const controller = require('../Controllers');
const { success, error } = require('../Views/message');
const bcrypt	 = require('bcrypt');

module.exports.getUserByName = function(req, res) {
	let name = req.params.name;
	controller.users.getUserByName(name)
	.then(ret => {
		res.send(ret);
	}).catch(e => {
		res.send(e);
	});
};

module.exports.create = async function(req, res) {
	try {
		const salt = await bcrypt.genSalt(1);
		let content = req.body;
		let password  = content.password;
		content.password = await bcrypt.hash(password, salt);
		controller.users.create(content)
		.then(b => {
			console.log(b);
			res.send(b);
		}).catch(e => {
			res.send(e);
		});
	} catch(e) {
		res.status(500).send(error(e));
	};
};