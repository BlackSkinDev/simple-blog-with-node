var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

const app = express();

// import routes
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var otherRouter = require('./routes/others');

// connect to db and start app
const mongoose = require('mongoose');
const dbUrl ='mongodb://127.0.0.1:27017/node-blog'; 

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(8000)
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', indexRouter);
app.use('/blogs',blogRouter)
app.use(otherRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


