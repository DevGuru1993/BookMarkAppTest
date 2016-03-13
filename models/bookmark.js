var mongoose = require('mongoose')

//Bookmarks db schema for mongoose
var bookmarkSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	url_link:{
		type: String,
		required: true
	},
	folder: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	created_date:{
		type: Date,
		default: Date.now()
	}
});

var Bookmark = module.exports = mongoose.model('Bookmark',bookmarkSchema);

//Get Bookmarks
module.exports.getBookmarks = function(callback, limit){
	Bookmark.find(callback).limit(limit);
}

//Get Bookmark By Id
module.exports.getBookmarkById = function(id, callback){
	Bookmark.findById(id, callback);
}


//Add Bookmark
module.exports.addBookmark = function(userid, bookmark, callback){
	bookmark.user = userid;
	Bookmark.create(bookmark, callback);
}

//Update Bookmark
module.exports.updateBookmark = function(id, bookmark, options, callback){
	var query = { _id: id};
	var update ={
		title: bookmark.title,
		url_link: bookmark.url_link,
		folder: bookmark.folder,
		user: bookmark.user
	}
	Bookmark.findOneAndUpdate(query, update, options, callback);
}

//Delete Bookmark
module.exports.removeBookmark = function(id, callback){
	var query = { _id: id};
	Bookmark.remove(query, callback);
}