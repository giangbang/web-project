'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const tags = models.tags;

async function create(tag) {
	let row = tags.build(tag);
	try {
		let row = await row.save();
		if (row == null) return error("Cannot create tag");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

async function del(id) {
	try {
		let tag = await tags.findByPk(id);
		if (tag == null) return error("Tag not found");
		tag = await tag.destroy();
		return success(tag);
	} catch (e) {
		return error(e);
	}
}

async function getById(id) {
	try {
		let tag = await tags.findOne(id, {
			where: { id: id},
			include: [quizzes]
		});
		if (tag == null) return error("Tag not found");
		return success(tag);
	} catch (e) {
		return error(e)
	}
}

module.exports = {
	getById: getById,
	create: create,
	del: del
}