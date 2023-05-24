const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("users", {
		name: {
			type: DataTypes.STRING
		},
		mobile_no: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: {
				args: true,
				msg: 'Mobile no already in use!'
			},
			len: [11,11],
			max: 11,
			min: 11,
		},
		password: {
			type: DataTypes.STRING
		},
	},{
		timestamps: false,
		underscored: true,
	});
	return User;
};