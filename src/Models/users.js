const { DataTypes } = require('sequelize');


module.exports = {
	schema:	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	name: 'users'
}
