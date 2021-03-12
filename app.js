

const createError = require('http-errors');
const express = require('express');

const keys = require('./config/keys');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser =  require('body-parser');
const exphbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chargeRouter = require('./routes/charge');

var app = express();


///andlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// view engine setup
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
// app.get('/', (req, res) =>{
//   res.render('index');
// })





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/charge', chargeRouter);

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

module.exports = app;
