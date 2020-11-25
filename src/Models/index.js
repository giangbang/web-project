'use strict'

const { Sequelize, Model } = require('sequelize');

const userModel 		    = require('./users');
const roleModel 		    = require('./roles');
const tagModel 			    = require('./tags');
const commentModel 		  = require('./comments');
const submissionModel 	= require('./submissions');
const pointModel 		    = require('./points');
const courseModel 		  = require('./courses');
const quizModel 		    = require('./quizzes');
const testCaseModel 		= require('./testCases');

class users 		  extends Model {};
class comments 		extends Model {};
class roles 		  extends Model {};
class submissions extends Model {};
class points 		  extends Model {};
class courses 		extends Model {};
class tags 			  extends Model {};
class quizzes 		extends Model {};
class testCases 	extends Model {};


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

roles.init(roleModel.schema, {
	sequelize : database,
	modelName: roleModel.name,
	timestamps: false
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

testCases.init(testCaseModel.schema, {
	sequelize : database,
	modelName: testCaseModel.name,
	timestamps: false
});

// ==============================================

users.belongsTo(roles, {
	foreignKey: { allowNull: false },
	onDelete: 'NO ACTION'
});

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

testCases.belongsTo(quizzes, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE'
});
quizzes.hasMany(testCases);

async function init(force =  false) {
	await database.authenticate();
	await database.sync({force: force});
	
	let roleList = await roles.findAll();
	if (roleList.length === 0) {
		for (const [name, role] of Object.entries(roleModel.defaults)) {
			let newRole = roles.build(role);
			newRole.save();
		}
	}
}

module.exports = {
	models: database.models,
	init: init
}
