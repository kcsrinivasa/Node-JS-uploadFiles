const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
var multer = require('multer');
var mime = require('mime-types');
var fs = require('fs')
const app = express();


app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


var storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
      var originalname = file.originalname;
      originalname = originalname.replace(/ /g, "_");
     cb(null, 'file_' + Date.now()+ originalname)
    }
});
var upload = multer({ storage: storage});


app.get('/',(req,res) => {
    res.render('index.ejs');
});
//to upload single file
app.post('/uploadSingleFile',upload.single('single_file'),function(req, res){
  console.log(req.file);
  res.end('Successfully uploaded');
});

// to upload multiple files
app.post('/uploadMultipleFiles',upload.any(),function(req,res){
var models =req.files;
// console.log(models);
var arr =[];

  for(var i=0; i < models.length; i++) { 
      arr.push(models[i].path);
     }
    console.log("multiple path : ", arr);
     res.end("Successfully uploaded");
});
//upload mutiple file in one input
app.post('/uploadMultipleFilesSingleInput',upload.any(),function(req,res){
  // console.log(req.files);
  // file name will be same for all files
  var uploaded_files = req.files;
  var arr = [];
  for(var i=0; i<uploaded_files.length; i++){
    arr.push(uploaded_files[i].path);
  }
  console.log(arr);
  res.end('Successfully uploaded');
});


app.listen(3000,() => {
    console.log('App Started on PORT  3000');
});

