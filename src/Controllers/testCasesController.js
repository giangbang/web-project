'use strict';

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

const quizzes 	          = models.quizzes;
const testCases 	        = models.testCases;

async function getById(id) {
	try {
		let testcase = await testCases.findByPk(id);
		if (testcase != null) return success(testcase);
		return error("TestCase not found");
	} catch (e) {
		return error(e);
	}
};


async function getAll() {
	try {
		let testcase = await testCases.findAll();
		return success(testcase);
	} catch (e) {
		return error(e);
	}
}

async function del(id) {
	try {
		let testcase = await testCases.findByPk(id);
		if (testcase == null) return error("TestCase not found");
		testcase = await testcase.destroy();
		return success(testcase);
	} catch (e) {
		return error(e);
	}
}

async function create(content) {
	try {
		let row = testCases.build(content);
		row = await row.save();
		if (row == null) return error("Cannot create testcase");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	getById: getById,
	create: create,
	del: del,
  getAll: getAll
}