var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var api = require('./routes/api.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/angular-node-mongo-app')
.then(() => console.log("Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp"))
.catch(() => console.log("Error Connecting to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);

module.exports = app;