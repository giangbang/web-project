'use strict'

const { success, error } = require('../Views/message');
const { models }		 = require('../Models');

const submissions 	= models.submissions;
const quizzes      	= models.quizzes;
const testCases    	= models.testCases;
const users       	= models.users;

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

async function getByUserAndQuiz(userId, quizId) {
	try {
		let submission = await users.findAll({
			where: { id : userId },
      attributes: ['id', 'username'],
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
		let submission = await submissions.findAll({
			where: { id: id },
			include: [
        {
          model: quizzes,
          attributes: [],
          include: {
            model: testCases,
            attributes: { exclude: ['password'] }
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

module.exports = {
	create: create,
	del: del,
  getById: getById,
  getByUserAndQuiz: getByUserAndQuiz
}