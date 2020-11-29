'use strict';

const controller         = require('../Controllers');
const { success, error } = require('../Views/message');

module.exports.getByName = async function(req, res, next) {
	try {
		let name = req.query.name;
		let q = await controller.users.getByName(name);
    
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.getById = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.users.getById(id);
    
    // console.log(req.user.data.dataValues)
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.update = async function(req, res, next) {
	try {
		let content = req.body;
    content.id = content.id || req.user.data.dataValues;
		let q = await controller.users.update(content);
    
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.del = async function(req, res, next) {
	try {
		let id = req.query.id;
		let q = await controller.users.del(id);
    
		res.status(q.status).send(q.data);
		next();
	} catch (e) {
		res.status(500).send((""+e));
	}
};

module.exports.create = async function(req, res, next) {
	try {
		let content = req.body;
    if (!(req.isAuthenticated() && req.user.data.dataValues.admin)) {
      content.admin = false;
    }
		let q = await controller.users.create(content);
    
		res.status(q.status).send(q.data);
		next();
	} catch(e) {
		res.status(500).send((e+''));
	};
};
