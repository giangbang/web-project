'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const quizzes 	= models.quizzes;
const comments 	= models.comments;
const users 	= models.users;

async function getComments(id) {
	quizzes.findAll({
		include: {
			model: comments,
			attributes: { exclude: ['userId', 'quizId'] },
			include: {
				model: users,
				attributes: { exclude: ['password', 'id'] }
			}
		},
		where: {
			id: id
		},
		attributes: []
	})
	.then(d => {
		return (success(d));
	})
	.catch(e => {
		return (error(e));
	});
};

async function create(content) {
	let row = quizzes.build(content);
	row.save().then(d => {
		return (success(d));
	}).catch(e => {
		return (error(e));
	});
}

module.exports = {
	getCommetns: getComments,
	create: create
}