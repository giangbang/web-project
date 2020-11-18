'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const comments = models.comments;

async function create(comment) {
	let row = comments.build(comment);
	row.save().then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

async function del(id) {
	comments.findByPk(req.params.id)
	.then(d => {
		return d.destroy();
	})
	.then(d => {
		return (success(d))
	}).catch(e => {
		return (error(e));
	});
}

async function edit(id, content) {
	comments.findByPk(id).then(b => {
		b.content = content;
		return b.save();
	}).then(b => {
		return (success(b));
	}).catch(e => {
		return error(e);
	});
}

module.exports = {
	create: create,
	del: del,
	edit: edit
}