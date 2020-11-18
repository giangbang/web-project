'use strict'

const LocalStrategy	 		= require('passport-local').Strategy;
const { success, error } 	= require('../Views/message');
const controller 			= require('../Controllers/index');
const bcrypt 				= require('bcrypt');

module.exports = function initialize(passport) {
	const authenticateUser = async (username, password, done) => {
	
		let res = await controller.users.getUserByName(username);
		if (!res.success) {
			return done(null, false, error("User not found!"));
		};
		let user = res.message;
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, error("Password incorrect!"));
			}
		} catch (e) {
			return done(e);
		}
	};
	passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser));
	passport.serializeUser((user, done) => { 
		// console.log(user);
	done(null, user.id) });
	passport.deserializeUser((id, done) => { 
		console.log(controller.users.getUserById(id));
		return done(null, controller.users.getUserById(id)) 
	});
}