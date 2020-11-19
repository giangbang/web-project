'use strict'

const LocalStrategy	 		= require('passport-local').Strategy;
const { success, error } 	= require('../Views/message');
const controller 			= require('../Controllers');

module.exports = function initialize(passport) {
	
	const authenticateUser = async (username, password, done) => {
	
		let res = await controller.users.getByName(username);
		if (!res.success) {
			return done(null, false, res);
		};
		let user = res.message;
		try {
			if (await controller.auth.verify(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, error("Password incorrect!"));
			}
		} catch (e) {
			return done(e);
		}
	};
	
	passport.use(new LocalStrategy(authenticateUser));
	passport.serializeUser((user, done) => {  done(null, user.id) });
	passport.deserializeUser(async (id, done) => { 
		let user = await controller.users.getById(id);
		return done(null, user);
	});
}