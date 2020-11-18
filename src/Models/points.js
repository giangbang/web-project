const { DataTypes } = require('sequelize');

module.exports = {
	schema:	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		point: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	name: 'points'
}

