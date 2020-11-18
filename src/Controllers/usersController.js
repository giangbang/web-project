'use strict'

const { success, error } = require('../Views/message');
const { models } 		 = require('../Models');

const users = models.users;

async function getUserByName(name) {
	
	try {
		let res = await users.findOne({
			where: {
				username: name
			}
		});
		// console.log(res)
		if (res !== null)
			return (success(res.dataValues));
		else return error("not found");
	} catch {
		return error("something went wrong");
	}
}

async function create(user) {
	let row = users.build(user);
	console.log(row);
	row.save().then(b => {
		return (success(b.dataValues));
	}).catch(e => {
		return (error(e));	
	});
}

async function getUserById(id) {
	users.findOne({
		where: {
			id: id
		}
	}).then(ret => {
		if (ret !== null)
			return (ret.dataValues);
		return ret;
	}).catch(e => {
		return (e)
	});
}

module.exports = {
	getUserByName: getUserByName,
	getUserById: getUserById,
	create: create
}