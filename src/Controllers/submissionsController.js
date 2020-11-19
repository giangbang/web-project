'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const submissions 	= models.submissions;

function create(submission) {
	let row = submissions.build(submission);
	
	row.save().then(d => {
		return success(d);
	}).catch(e => {
		return error(e);
	})
}

function del(id)  {
	submissions.findByPk(id)
	.then(d => {
		return d.destroy();
	}).then(d => {
		return success(d);
	}).catch(e => {
		return error(e);
	})
}

module.exports = {
	create: create,
	del: del
}