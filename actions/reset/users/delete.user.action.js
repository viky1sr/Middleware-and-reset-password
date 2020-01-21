const User = require('../../../models/user.model')

class UserDelete {

	 constructor(req) {

      this.id = req.params.id;

	 }

	  async exec() {

	     const {id} = this;

 		return await User.findByIdAndDelete(id);
	  }
}

module.exports = UserDelete;