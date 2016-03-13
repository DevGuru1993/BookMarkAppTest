var mongoose = require('mongoose')


//User db schema for mongoose
var folderSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	created_date:{
		type: Date,
		default: Date.now()
	}
	
});

var Folder = module.exports = mongoose.model('Folder',folderSchema);

//Get Folder
module.exports.getFolders= function(callback, limit){
	Folder.find(callback).limit(limit);
}

//Get Folder By Id
module.exports.getFolderById = function(id, callback){
	Folder.findById(id, callback);
}

//Add Folder
module.exports.addFolder = function(folder, callback){
	Folder.create(folder, callback);
}

//Update Folder
module.exports.updateFolder = function(id, folder, options, callback){
	var query = { _id: id};
	var update ={
		name: folder.name
	}
	Folder.findOneAndUpdate(query, update, options, callback);
}

//Delete Folder
module.exports.removeFolder = function(id, callback){
	var query = { _id: id};
	Folder.remove(query, callback);
}