'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const comments = models.comments;

async function create(comment) {
	try {
		let row = comments.build(comment);
		row  = await row.save();
		if (row == null) return error("Cannot create comment");
		return success(row);
	} catch(e) {
		return error(e);
	}
}

async function del(id) {
	try {
		let comment = await comments.findByPk(id);
		comment = await comment.destroy();
		if (comment != null) return success(comment);
		return error("Cannot delete comment");
	} catch(e) {
		return error(e);
	}
}

async function edit(id, content) {
	try {
		let comment = comments.findByPk(id);
		comment.content = content;
		comment = await comment.save();
		if (comment == null) return error("Cannot edit comment");
		return success(comment);
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	create: create,
	del: del,
	edit: edit
}