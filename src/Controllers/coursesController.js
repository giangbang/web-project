'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const courses = models.courses;
const quizzes = models.quizzes;

async function getByCode() {
	courses.findAll({
		where: {
			code: code
		},
		include: [quizzes],
		attributes: ["name"]
	}).then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	})
};

async function create(course) {
	let row = courses.build(course);
	row.save().then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
};

module.exports = {
	getByCode: getByCode,
	create: create
}
