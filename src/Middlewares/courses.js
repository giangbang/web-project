'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const courses = models.courses;
const quizzes = models.quizzes;

module.exports.getByID = (req, res) => {
	courses.findOne({
		where: {
			id: req.params.id
		},
		include: [quizzes],
		attributes: []
	}).then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	})
};

module.exports.create = (req, res) => {
	let content = req.body;
	let row = courses.build(content);
	row.save().then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	});
};

module.exports.get = (req, res) => {
	courses.findAll()
	.then(d => {
		res.send(success(d));
	}).catch(e => {
		res.send(error(e));
	})
};