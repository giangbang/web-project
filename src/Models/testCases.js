const { DataTypes } = require('sequelize');


module.exports = {
	schema:	{
		Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	name: 'testCases'
}


