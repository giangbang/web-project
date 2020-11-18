const { DataTypes } = require('sequelize');

module.exports = {
	schema: {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		studentCode: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	name: 'students'
}


