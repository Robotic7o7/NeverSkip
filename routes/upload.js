var express = require("express");
var router = express.Router();
var multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/assignments/submissions')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


// const multer = require("multer");
//     const upload = multer({
//     	dest: "/home/assignments/submissions/"
//     });

//     router.post('/upload/', upload.any(), function(req, res) {
//     	var uploadedFiles = req.files;
//     	var newfilename = uploadedFiles[0];//here we get fileName of uploaded file
//     	const targetPath = "/home/assignments/submissions/"
//             +newfilename.filename;//This is a simple string which has uploaded file path
//     	const tempPath = "/home/assignments/submissions/assignment-submission";
//             //This is a simple string which has would be used to rename file
//     	fs.rename(targetPath, tempPath, function(err) {
//     	    if ( err ) console.log('ERROR: ' + err);
//     	});
//     	console.log("NEW FILE NAME : "+newfilename.filename)
//     	res.redirect('/machine-settings.html');
//     });


router.post('/upload-img', upload.single('file'), function (req, res, next) {
    console.log(JSON.stringify(req.file))
    res.send(200).json(req.file.path)
  })


module.exports = router;