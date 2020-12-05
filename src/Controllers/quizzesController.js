'use strict'

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

const quizzes 	          = models.quizzes;
const comments 	          = models.comments;
const users 	            = models.users;
const testCases 	        = models.testCases;
const tags                = models.tags;
const courses             = models.courses;


async function getByCourse(id) {
	try {
		let quiz = await courses.findOne({
			where: { id: id },
      attributes: [],
			include: {
        model: tags,
        attributes: ['id'],
        include: [quizzes],
      }
		});
		if (quiz != null) {
      let result = [];
      for (const tag of quiz.tags) {
        result = result.concat(tag.quizzes);
      }
      return success(result);
    }
		return error("Quiz not found");
	} catch (e) {
		return error(e+'');
	}
};

async function getById(id) {
	try {
		let quiz = await quizzes.findOne({
			where: { id: id },
			include: [
        {
          model: comments,
          attributes: { exclude: ['userId', 'quizId'] }        
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

async function getByTag(id) {
	try {
		let quiz = await tags.findOne({
      where: {id: id},
      attributes: [],
      include: [quizzes]
    });
		return success(quiz);
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	getById: getById,
	create: create,
	del: del,
  getAll: getAll,
  getByTag: getByTag,
  getByCourse: getByCourse
}