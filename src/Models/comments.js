const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = {
	schema:	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	name: 'comments'
}