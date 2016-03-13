var express = require("express")
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Bookmark = require('./models/bookmark')
var Folder = require('./models/folder')
var config = require('./lib/config')

//To Enable body parser
app.use(bodyParser.json());

//Connect to mongoose
mongoose.connect(config.appConfig.mongodbUrl)
var db = mongoose.connection

//This is to return error when wrong url
app.get('/',function (req,res) {
	 res.send('Please use the /api/user or /api/bookmarks or /api/folder');  
});


//Create, Update, View and delete of bookmarks starts
//To get all bookmarks
app.get('/api/bookmarks',function (req,res) {
	Bookmark.getBookmarks(function(err, bookmarks){
		if(err){
			throw err;
		}
		res.json(bookmarks);
	});
});

//To get one bookmark by id
app.get('/api/bookmarks/:_id',function (req,res) {
	Bookmark.getBookmarkById(req.params._id,function(err, bookmark){
		if(err){
			throw err;
		}
		res.json(bookmark);
	});
});

//To Add a bookmark
app.post('/api/bookmarks',function (req,res) {
	var userid = req.header.userid;
	var bookmark = req.body;
	Bookmark.addBookmark(userid,bookmark, function(err, bookmark){
		if(err){
			throw err;
		}
		res.json(bookmark);
	});
});

//To Update a bookmark
app.put('/api/bookmarks/:_id',function (req,res) {
	var id = req.params._id;
	var bookmark = req.body;
	Bookmark.updateBookmark(id, bookmark, {}, function(err, bookmark){
		if(err){
			throw err;
		}
		res.json(bookmark);
	});
});

//To delete a bookmark
app.delete('/api/bookmarks/:_id',function (req,res) {
	var id = req.params._id;
	Bookmark.removeBookmark(id, function(err, bookmark){
		if(err){
			throw err;
		}
		res.json(bookmark);
	});
});
//Create, Update, View and delete of bookmarks ends


//Create, Update, View and delete of folder starts
//To get all folders
app.get('/api/folders',function (req,res) {
	Folder.getFolders(function(err, folders){
		if(err){
			throw err;
		}
		res.json(folders);
	});
});

//To get one Folder by id
app.get('/api/folders/:_id',function (req,res) {
	Folder.getFolderById(req.params._id,function(err, folder){
		if(err){
			throw err;
		}
		res.json(folder);
	});
});

//To Add a Folder
app.post('/api/folders',function (req,res) {
	var folder = req.body;
	Folder.addFolder(folder, function(err, folder){
		if(err){
			throw err;
		}
		res.json(folder);
	});
});

//To Update a Folder
app.put('/api/folders/:_id',function (req,res) {
	var id = req.params._id;
	var folder = req.body;
	Folder.updateFolder(id, folder, {}, function(err, folder){
		if(err){
			throw err;
		}
		res.json(folder);
	});
});

//To delete a folder
app.delete('/api/folders/:_id',function (req,res) {
	var id = req.params._id;
	Folder.removeFolder(id, function(err, folder){
		if(err){
			throw err;
		}
		res.json(folder);
	});
});
//Create, Update, View and delete of bookmarks ends

app.listen(3000);

console.log('Running at port 3000...!')