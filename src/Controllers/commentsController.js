'use strict';

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

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
		let comment = await comments.findOne({
      where: {id : id}
    });
		if (comment != null) {
			comment = await comment.destroy();
			return success(comment);
		}
		return error("Comment not found");
	} catch(e) {
		return error(e);
	}
}

async function getById(id) {
	try {
		let comment = await comments.findByPk(id);
		if (comment == null) return error("Comment not found");
		return success(comment);
	} catch (e) {
		return error(e);
	}
}

async function edit(id, content) {
	try {
		let comment = await comments.findByPk(id);
		if (comment == null) return error("Comment not found");
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
	edit: edit,
  getById: getById
}