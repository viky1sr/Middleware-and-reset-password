const User = require('../../../models/user.model')

class UserRead {

	 constructor(req) {

      this.id = req.params.id;

	 }

	  async exec() {

	     const {id} = this;

 		return await User.findById(id);
	  }
}

module.exports = UserRead;