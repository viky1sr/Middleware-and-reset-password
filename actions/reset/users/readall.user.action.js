const User = require('../../../models/user.model')

class ReadAll {

	async exec() {

		return await User.find({});
	}
}

module.exports = ReadAll;