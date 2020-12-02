'use strict'

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

const tags                = models.tags;
const courses             = models.courses;
const quizzes             = models.quizzes;

async function getByCourse(id) {
  try {
		let tag = await courses.findOne({
      where: { id: id },
      include: [tags],
      attributes: []
    });
		return success(tag);
	} catch (e) {
		return error(e);
	}
}

async function create(tag) {
	let row = tags.build(tag);
	try {
		row = await row.save();
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
		let tag = await tags.findOne( {
			where: { id: id},
			include: [quizzes]
		});
		if (tag == null) return error("Tag not found");
		return success(tag);
	} catch (e) {
		return error(e)
	}
}

async function getAll() {
  try {
		let tag = await tags.findAll();
		return success(tag);
	} catch (e) {
		return error(e)
	}
}

module.exports = {
	getById: getById,
	create: create,
	del: del,
  getAll: getAll,
  getByCourse: getByCourse
} 