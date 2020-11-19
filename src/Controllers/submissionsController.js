'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const submissions 	= models.submissions;

async function create(submission) {
	let row = submissions.build(submission);
	try {
		let row = await row.save();
		if (row == null) 
			return error("Cannot create submission");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

async function del(id)  {
	try {
		let submission = await submissions.findByPk(id);
		if (submission == null) 
			return error("Submission not found");
		submission = submission.destroy();
		if (submission != null) 
			return success(submission);
		return error("Cannot delete submission");
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	create: create,
	del: del
}