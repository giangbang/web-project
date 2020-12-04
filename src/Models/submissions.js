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
		},
    point: {
      type: DataTypes.INTEGER
    }
	},
	name: 'submissions'
}


