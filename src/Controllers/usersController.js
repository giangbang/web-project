'use strict'

const { success, error }  = require('../Views/message');
const { models } 		      = require('../Models');
const controller          = require('../Controllers');

const users = models.users;

async function del(id) {
	try {
		let user = await users.findOne({
      where: {id : id}
    });
		if (user == null) return error("User not found");
		user = await user.destroy();
		if (user != null) return success(user);
		return error("Cannot delete user");
	} catch (e) {
		return error(e+"");
	}
}

async function getByName(name) {
	try {
		let res = await users.findOne({
			where: {
				username: name
			}
		});
		if (res !== null) {
			return (success(res));
    }
		else return error("User not found");
	} catch(e) {
		return error(e+"");
	}
}

async function create(user) {
  user.password = await controller.auth.encrypt(user.password);
	let row = users.build(user);
	try {
		row = await row.save();
		if (row == null) return error("Cannot create user");
		return success(row);
	} catch (e) {
		return error(""+e);
	}
}

async function update(newUser) {
  let id = newUser.id;
  try {
    let user = await getById(id);
    if (user.status != 200) return error("User not found");
    user = user.data;
    for (let [key, value] of Object.entries(newUser)) {
      if (key == 'id') continue;
      if (key == 'password') {
        value = await controller.auth.encrypt(value);
      }
      user[key] = value;
    }
    
    newUser = await user.save();
    return success(newUser);
  } catch(e) {
    return error('' + e);
  }
}

async function getById(id) {
	try {
		let user = await users.findOne({
			where: { id:id },
      attributes: { exclude: ['password']}
		});
		if (user == null) return error("User not found");
		return success(user);
	} catch (e) {
		return error(e+"");
	};
}

async function getAll() {
  try {
		let user = await users.findAll({
      attributes: { exclude: ['password']}
    });
		return success(user);
	} catch (e) {
		return error(e+"");
	};
}

module.exports = {
	getByName: getByName,
	getById: getById,
	create: create,
	del: del,
  update: update,
  getAll: getAll
}