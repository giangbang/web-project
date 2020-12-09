'use strict'

const { success, error }  = require('../Views/message');
const { models }		      = require('../Models');

const courses             = models.courses;
const tags                = models.tags;
const quizzes             = models.quizzes;
const submissions         = models.submissions;
const users               = models.users;

async function getByCode(code) {
	try {
		let course = await courses.findOne({
			where: {
				code: code
			}
		});
		if (course == null) return error("Course not found");
		return success(course);
	} catch (e) {
		return error(e+'');
	}
};

async function getById(id) {
  try {
		let course = await courses.findOne({
			where: {
				id: id
			}
		});;
		if (course == null) return error("Course not found");
		return success(course);
	} catch (e) {
		return error(e+'');
	}
}

async function create(course) {
	try {
		let row = courses.build(course);
		row = await row.save();
		if (row != null) return success(row);
		return error("Cannot create course");
	} catch (e) {
		return error(e+'');
	}
};

async function getAll() {
  try {
    let course = await courses.findAll();
    return success(course);
  } catch(e) {
    return error(e+'');
  }
}

async function update(id, newCourse) {
  try {
		let course = await courses.findByPk(id);
		if (course == null) return error("Course not found");
    
    for (let [key, value] of Object.entries(newCourse)) {
      if (key == 'id') continue;
      course[key] = value;
    }
    course = await course.save();
		return success(course);
	} catch (e) {
		return error(e+'');
	}
}

async function del(id) {
	try {
		let course = await courses.findByPk(id);
		if (course == null) return error("Course not found");
		course = await course.destroy();
		return success(course);
	} catch (e) {
		return error(e+'');
	}
}

async function getPointByUser(userId, courseId) {
  try {
		let point = await courses.findOne({
      where: {id: courseId},
      attributes: ['id'],
      include: {
        model: tags,
        attributes: ['id'],
        include: {
          model: quizzes,
          attributes: ['id'],
          include: {
            model: submissions,
            attributes: ['point'],
            inlcude: {
              model: users,
              attributes: ['id'],
              where: {id: userId}
            }
          }
        }
      }
    });
		if (point == null) return error("Course not found");
		
    let total = 0;
    for (const tag of point.tags) {
      for (const quiz of tag.quizzes) {
        for (const submission of quiz.submissions) {
          total += submission.point;
        }
      }
    }
		return success({total});
	} catch (e) {
		return error(e+'');
	}
}

module.exports = {
	getByCode: getByCode,
  getById, getById,
	create: create, 
  update: update,
	del: del,
  getAll: getAll,
  getPointByUser: getPointByUser
}
