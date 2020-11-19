'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const tags = models.tags;

function create(tag) {
	let row = tags.build(tag);
	
	row.save().then(b => {
		return success(b);
	}).catch(e => {
		return error(e);
	})
}

function del(id) {
	tags.findByPk(id)
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