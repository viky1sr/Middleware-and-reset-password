const User = require('../../../models/user.model')
const bcrypt = require('bcryptjs')

class UserCreate {

	 constructor(req) {

	 this.name = req.body.name;
     this.username = req.body.username;
     this.email = req.body.email;
     this.gender = req.body.gender;
     this.phone = req.body.phone;
     this.password = bcrypt.hashSync(req.body.password, 10);
     this.password_confirmation = bcrypt.hashSync(req.body.password_confirmation, 10);
     this.role_id = req.body.role_id;

	 }

	  async exec() {

	  	const {name, username, email, gender, phone, password, role_id} = this;
	  	const data = {name, username, email, gender, phone, password, role_id};
 		const inputData = new User(data);

 		return await inputData.save();

	  }
}

module.exports = UserCreate;