'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	encrypt: async function(password) {
		const salt = await bcrypt.genSalt(2);
		return await bcrypt.hash(password, salt);
	},
	verify: async function(password, hash) {
		return await bcrypt.compare(password, hash);
	}
}