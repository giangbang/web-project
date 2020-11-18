const { DataTypes } = require('sequelize');

module.exports = {
	schema: {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		sourceCode: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	name: 'submissions'
}


