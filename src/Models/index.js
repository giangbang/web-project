'use strict'

const { Sequelize, Model } = require('sequelize');

const userModel 		    = require('./users');
const commentModel 		  = require('./comments');
const submissionModel 	= require('./submissions');
const courseModel 		  = require('./courses');
const quizModel 		    = require('./quizzes');
const testCaseModel 		= require('./testCases');
const sample            = require('./sample');
const tagModel          = require('./tags');
const controller        = require('../Controllers');

class users 		  extends Model {};
class comments 		extends Model {};
class submissions extends Model {};
class courses 		extends Model {};
class quizzes 		extends Model {};
class testCases   extends Model {};
class tags        extends Model {};


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

comments.init(commentModel.schema, {
	sequelize : database,
	modelName: commentModel.name
});

submissions.init(submissionModel.schema, {
	sequelize : database,
	modelName: submissionModel.name
});

courses.init(courseModel.schema, {
	sequelize : database,
	modelName: courseModel.name
});

quizzes.init(quizModel.schema, {
	sequelize : database,
	modelName: quizModel.name
});

testCases.init(testCaseModel.schema, {
	sequelize : database,
	modelName: testCaseModel.name,
	timestamps: false
});

tags.init(tagModel.schema, {
	sequelize : database,
	modelName: tagModel.name
});


// ==============================================

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

quizzes.belongsTo(tags, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
tags.hasMany(quizzes);

tags.belongsTo(courses, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
courses.hasMany(tags);

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

testCases.belongsTo(quizzes, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
quizzes.hasMany(testCases);

// ==============================================

async function init(force =  false) {
	await database.authenticate();
	await database.sync({force: force});
	
  sample();
  // initialize a default admin account
	let userList = await users.findAll();
	if (userList.length === 0) {
    controller.users.create(userModel.admin)
	}
}

module.exports = {
	models: database.models,
	init: init
}
