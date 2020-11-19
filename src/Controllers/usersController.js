'use strict'

const { success, error } = require('../Views/message');
const { models } 		 = require('../Models');

const users = models.users;

async function getByName(name) {
	try {
		let res = await users.findOne({
			where: {
				username: name
			}
		});
		if (res !== null)
			return (success(res.dataValues));
		else return error("User not found");
	} catch(e) {
		return error(e);
	}
}

async function create(user) {
	let row = users.build(user);
	try {
		let row = await row.save();
		if (row == null) return error("Cannot create user");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

async function getById(id) {
	try {
		let user = await users.findByPk(id);
		if (user == null) return error("User not found");
		return success(user);
	} catch (e) {
		return error(e);
	};
}

module.exports = {
	getUserByName: getByName,
	getById: getById,
	create: create
}