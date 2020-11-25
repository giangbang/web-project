'use strict'

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

const quizzes 	          = models.quizzes;
const comments 	          = models.comments;
const users 	            = models.users;
const testCases 	        = models.testCases;

async function getById(id) {
	try {
		let quiz = await quizzes.findOne({
			where: { id: id },
			include: [
        {
          model: comments,
          attributes: { exclude: ['userId', 'quizId'] },
          include: {
            model: users,
            attributes: { exclude: ['password'] }
          }        
        },
        {
          model: testCases,
          attributes: { exclude: ['quizId']}
        }
      ]
		});
		if (quiz != null) return success(quiz);
		return error("Quiz not found");
	} catch (e) {
		return error(e);
	}
};


async function getAll() {
	try {
		let quiz = await quizzes.findAll();
		return success(quiz);
	} catch (e) {
		return error(e);
	}
}

async function del(id) {
	try {
		let quiz = await quizzes.findByPk(id);
		if (quiz == null) return error("Quiz not found");
		quiz = await quiz.destroy();
		return success(quiz);
	} catch (e) {
		return error(e);
	}
}

async function create(content) {
	try {
		let row = quizzes.build(content);
		row = await row.save();
		if (row == null) return error("Cannot create quiz");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	getById: getById,
	create: create,
	del: del,
  getAll: getAll
}