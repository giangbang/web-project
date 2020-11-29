'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const courses = models.courses;
const tags = models.tags;

async function getByCode(code) {
	try {
		let course = await courses.findOne({
			where: {
				code: code
			}
		});
		if (course == null) return error("Course not found");
		return success(course);
	} catch (e) {
		return error(e);
	}
};

async function getById(id) {
  try {
		let course = await courses.findOne({
			where: {
				id: id
			}
		});;
		if (course == null) return error("Course not found");
		return success(course);
	} catch (e) {
		return error(e);
	}
}

async function create(course) {
	try {
		let row = courses.build(course);
		row = await row.save();
		if (row != null) return success(row);
		return error("Cannot create course");
	} catch (e) {
		return error(e);
	}
};

async function getAll() {
  try {
    let course = await courses.findAll();
    return success(course);
  } catch(e) {
    return error(e);
  }
}

async function del(id) {
	try {
		let course = await courses.findByPk(id);
		if (course == null) return error("Course not found");
		course = await course.destroy();
		return success(course);
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	getByCode: getByCode,
  getById, getById,
	create: create, 
	del: del,
  getAll: getAll
}
