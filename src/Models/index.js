'use strict'

const { Sequelize, Model } = require('sequelize');

const userModel 		= require('./users');
const studentModel 		= require('./students');
const tagModel 			= require('./tags');
const commentModel 		= require('./comments');
const submissionModel 	= require('./submissions');
const pointModel 		= require('./points');
const courseModel 		= require('./courses');
const quizModel 		= require('./quizzes');

class users 		extends Model {}
class comments 		extends Model {}
class students 		extends Model {}
class submissions 	extends Model {}
class points 		extends Model {}
class courses 		extends Model {}
class tags 			extends Model {}
class quizzes 		extends Model {}


let database = new Sequelize(
	process.env.DB_DATABASE, 
	process.env.DB_USERNAME, 
	process.env.DB_PASSWORD, 
	{
		host : process.env.DB_HOST,
		dialect: process.env.DIALECT
	}
);


users.init(userModel.schema, {
	sequelize : database,
	modelName: userModel.name
});

students.init(studentModel.schema, {
	sequelize : database,
	modelName: studentModel.name
});

tags.init(tagModel.schema, {
	sequelize : database,
	modelName: tagModel.name
});

comments.init(commentModel.schema, {
	sequelize : database,
	modelName: commentModel.name
});

submissions.init(submissionModel.schema, {
	sequelize : database,
	modelName: submissionModel.name
});

points.init(pointModel.schema, {
	sequelize : database,
	modelName: pointModel.name
});

courses.init(courseModel.schema, {
	sequelize : database,
	modelName: courseModel.name
});

quizzes.init(quizModel.schema, {
	sequelize : database,
	modelName: quizModel.name
});


students.belongsTo(users, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
users.hasOne(students);

comments.belongsTo(users, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
users.hasMany(comments);

comments.belongsTo(quizzes, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
quizzes.hasMany(comments);

courses.hasMany(tags);
tags.belongsTo(courses, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});

quizzes.belongsTo(tags, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
tags.hasMany(quizzes);

submissions.belongsTo(quizzes, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
quizzes.hasMany(submissions);

submissions.belongsTo(users, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
users.hasMany(submissions);

points.belongsTo(users, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
users.hasMany(points);

points.belongsTo(quizzes, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
quizzes.hasMany(points);

async function init(force =  false) {
	await database.authenticate();
	await database.sync({force: force});
}

module.exports = {
	models: database.models,
	init: init
}
