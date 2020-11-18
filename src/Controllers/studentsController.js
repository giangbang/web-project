'use strict'

const { success, error } 	= require('../Views/message');
const { models } 			= require('../Models');

const students 	= models.students;
const users    	= models.users;

async function getByCode(code) {
	students.findAll({
		where: {
			studentCode: req.params.code
		}
	}).then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

async function create(student) {
	let row = students.build(student);
	
	row.save().then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

module.exports = {
	getByCode: getByCode,
	create: create
}