var mongoose = require('mongoose')


//User db schema for mongoose
var userSchema = mongoose.Schema({
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	created_date:{
		type: Date,
		default: Date.now()
	},	
	
});

var User = module.exports = mongoose.model('User',userSchema);

//Get User
module.exports.getUser = function(callback, limit){
	User.find(callback).limit(limit);
}

//Add User
module.exports.addUser = function(user, callback){
	User.create(user, callback);
}

//Update User
module.exports.updateUser = function(id, user, options, callback){
	var query = { _id: id};
	var update ={
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		password: user.password
	}
	User.findOneAndUpdate(query, update, options, callback);
}

//Delete User
module.exports.removeUser = function(id, callback){
	var query = { _id: id};
	User.remove(query, callback);
}