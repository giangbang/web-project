const { DataTypes } = require('sequelize');

module.exports = {
	schema: {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		}
	},
	name: 'roles',
	defaults: {
		student: { role: 'Student' },
		admin  : { role: 'Admin' }
	}
}

