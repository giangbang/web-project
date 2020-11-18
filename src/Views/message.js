'use strict'

function successMessage(data) {
	return {
		success: true,
		message: data
	}
}

function errorMessage(error) {
	return {
		success: false,
		message: error
	}
}

module.exports = {
	success: successMessage,
	error: errorMessage
}

