'use strict'

const { success, error } 	= require('../Views/message');
const { models } 			= require('../Models');

const students 	= models.students;
const users    	= models.users;

async function getByCode(code) {
	try {
		let student 
	}
	students.findOne({
		where: {
			studentCode: code
		}
	}).then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

function create(student) {
	let row = students.build(student);
	
	row.save().then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

function del(id) {
	students.findByPk(id)
	.then(d => {
		return d.destroy();
	}).then(d => {
		return success(d);
	}).catch(e => {
		return error(e);
	})
}

module.exports = {
	getByCode: getByCode,
	create: create,
	del: del
}