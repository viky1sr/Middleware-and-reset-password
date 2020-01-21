const User = require('../../../models/user.model')
const bcrypt = require('bcryptjs')

class UserUpdate {

	 constructor(req) {

	 this.id = req.params.id;
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

	  	const {id, name, username, email, gender, phone, password, role_id} = this;
	  	const data = {name, username, email, gender, phone, password, role_id};

 		return await User.updateOne({_id: id} ,data);

	  }
}

module.exports = UserUpdate;