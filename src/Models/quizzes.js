const { DataTypes } = require('sequelize');

module.exports = {
	schema:	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		deadline: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	name: 'quizzes'
}
