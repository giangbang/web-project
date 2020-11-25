'use strict'

function successMessage(data) {
	return {
		status: 200,
		data: data
	}
}

function errorMessage(error) {
	return {
		status: 400,
		data: error+''
	}
}

module.exports = {
	success: successMessage,
	error: errorMessage
}

