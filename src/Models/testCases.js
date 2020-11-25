const { DataTypes } = require('sequelize');

module.exports = {
	schema:	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		input: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    output: {
      type: DataTypes.STRING,
			allowNull: false,
    },
	},
	name: 'testCases'
}