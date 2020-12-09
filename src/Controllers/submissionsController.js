'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const submissions 	= models.submissions;
const quizzes      	= models.quizzes;
const testCases    	= models.testCases;
const users       	= models.users;
const courses       = models.courses;
const tags          = models.tags;

async function create(submission) {
	let row = submissions.build(submission);
	try {
		row = await row.save();
		if (row == null) 
			return error("Cannot create submission");
		return success(row);
	} catch (e) {
		return error(e);
	}
}

async function getAllByQuiz(id) {
  try {
		let submission = await submissions.findAll({
			where: { quizId : id }
		});
		if (submission != null) return success(submission);
		return error("Submission not found");
	} catch (e) {
		return error(e);
	}
}

async function getByCourse(id) {
  try {
		let submission = await courses.findOne({
			where: { id : id },
      attributes: ['id'],
      include: {
        model: tags,
        attributes: ['id'],
        include: {
          model: quizzes,
          attributes: ['id'],
          include: [submissions]
        }
      }
		});
    console.log(submission);
		if (submission != null) {
      let result = [];
      for (const tag of submission.tags) {
        for (const quiz of tag.quizzes) {
          for (const sbm of quiz.submissions) {
            result = result.concat(sbm);
          }
        }
      }
      return success(result);
    }
		return error("Submission not found");
	} catch (e) {
		return error(e);
	}
}

async function getByUserAndQuiz(userId, quizId) {
	try {
		let submission = await users.findOne({
			where: { id : userId },
      attributes: ['id', 'username', 'fullname'],
			include: [
        {
          model: submissions,
          include: {
            model: quizzes,
            attributes: ['id'],
            where: {
              id: quizId
            },
            include: {
              model: testCases,
              attributes: ['input', 'output']
            }
          }        
        }
      ]
		});
		if (submission != null) return success(submission);
		return error("Submission not found");
	} catch (e) {
		return error(e);
	}
}

async function getById(id) {
	try {
		let submission = await submissions.findOne({
			where: { id: id },
			include: [
        {
          model: quizzes,
          include: {
            model: testCases
          }        
        }
      ]
		});
		if (submission != null) return success(submission);
		return error("Submission not found");
	} catch (e) {
		return error(e);
	}
}

async function del(id)  {
	try {
		let submission = await submissions.findByPk(id);
		if (submission == null) 
			return error("Submission not found");
		submission = submission.destroy();
		if (submission != null) 
			return success(submission);
		return error("Cannot delete submission");
	} catch (e) {
		return error(e);
	}
}

async function getByUser(id) {
  try {
		let submission = await users.findOne({
			where: {id: id},
      attributes: ['id'],
      include: [submissions]
		});
    submission = submission.submissions;
		if (submission != null) return success(submission);
		return error("Submission not found");
	} catch (e) {
		return error(e);
	}
}

module.exports = {
	create: create,
	del: del,
  getById: getById,
  getByUserAndQuiz: getByUserAndQuiz,
  getAllByQuiz: getAllByQuiz,
  getByCourse: getByCourse,
  getByUser: getByUser
}