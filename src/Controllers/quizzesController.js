'use strict'

const { success, error }      = require('../Views/message');
const { models, sequelize }   = require('../Models');
const Sequelize               = require('sequelize');

const quizzes                 = models.quizzes;
const comments                = models.comments;
const users                   = models.users;
const testCases               = models.testCases;
const tags                    = models.tags;
const courses                 = models.courses;
const submissions             = models.submissions;


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

async function getUsersPoint(userid, quizid) {
  try {
    let point = await users.findOne({
      where: { id: userid },
      include: [
        {
          model: submissions,
          include: {
            model: quizzes,
            attributes: ['id'],
            where: { id: quizid }
          },
          order: [
            ['point', 'DESC']
          ],
          limit: 1
        }
      ],
      attributes: ['id']
    });
    
    if (point == null) 
      return error("Quiz id not found");
      
    let result = { point: undefined }
    if (point.submissions.length >= 1) {
      result = { point: (point.submissions)[0].point };
    }
    return success(result);
    
  } catch (e) {
    return error(e+'');
  }
}

async function getHighestPoint(quizid, top = 10) {
  let maxNumQuery = 20;
  try {
    let point = await quizzes.findOne({
      where: { id: quizid },
      include: [
        {
          model: submissions,
          order: [
            ['point', 'DESC']
          ],
          attributes: ['point', 'id']
        }
      ],
      attributes: ['id']
    });
    if (point != null) return success(point.submissions);
    return error("Quiz id not found");
  } catch (e) {
    return error(e+'');
  }
}

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
            attributes: { exclude: ['password']}
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
    return error(e+'');
  }
};


async function getAll() {
  try {
    let quiz = await quizzes.findAll();
    return success(quiz);
  } catch (e) {
    return error(e+'');
  }
}

async function del(id) {
  try {
    let quiz = await quizzes.findByPk(id);
    if (quiz == null) return error("Quiz not found");
    quiz = await quiz.destroy();
    return success(quiz);
  } catch (e) {
    return error(e+'');
  }
}

async function create(content) {
  try {
    let row = quizzes.build(content.quiz);
    row = await row.save();
    
    if (row == null) return error("Cannot create quiz");
    for (const testCase of content.testCases) {
      testCase.quizId = row.id;
      let result = await testCases.create(testCase);
    }
    return success(row);
  } catch (e) {
    return error(e+'');
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
    return error(e+"");
  }
}

async function update(id, newQuiz) {
  try {
    let quiz = await quizzes.findByPk(id);
    if (quiz == null) return error("Quiz not found");
    
    for (let [key, value] of Object.entries(newQuiz)) {
      if (key == 'id') continue;
      quiz[key] = value;
    }
    quiz = await quiz.save();
    return success(quiz);
  } catch (e) {
    return error(e+'');
  }
}

async function getAllquizzesWithPointOfUser(id) {
  try {
    let quiz = await sequelize.query(`
      SELECT quizId, MAX(point) AS point FROM quizzes
      INNER JOIN (SELECT users.id, submissions.point, quizId FROM users
        INNER JOIN submissions ON submissions.userId = users.id
        WHERE users.id = ${id}
      ) AS submission_table ON submission_table.quizId = quizzes.id
      GROUP BY quizId
    `, { type: Sequelize.QueryTypes.SELECT });

    if (quiz == null) return error("Quiz not found");
    return success(quiz);
    
  } catch (e) {
    return error(e+'');
  }
}

module.exports = {
  getById: getById,
  create: create,
  del: del,
  update: update,
  getAll: getAll,
  getByTag: getByTag,
  getByCourse: getByCourse,
  getUsersPoint: getUsersPoint,
  getHighestPoint: getHighestPoint,
  getAllquizzesWithPointOfUser: getAllquizzesWithPointOfUser
}