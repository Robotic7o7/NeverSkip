var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
var dotenv = require("dotenv");

dotenv.config();


//mongoose
var mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(
    `mongodb+srv://robotic707:${process.env.MONGOPWD}@cluster0.msywl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    mongooseOptions
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("mongodb connection established");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/students');
var teacherRouter = require('./routes/teachers');
var classRouter = require('./routes/classes');
var authRouter = require('./routes/auth');
var subjectRouter = require('./routes/subjects');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/classes', classRouter);
app.use('/subject', subjectRouter);
app.use('/upload', uploadRouter);

module.exports = app;
