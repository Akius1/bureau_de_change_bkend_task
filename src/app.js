
const createError = require('http-errors');
const express = require('express');

const keys = require('../config/keys');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const stripe = require('stripe')(keys.stripeSecretKey);
const bodyParser =  require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require("dotenv");
const mongoose = require('mongoose');

const indexRouter = require('../src/routes/index');
const usersRouter = require('../src/routes/users');
const chargeRouter = require('../src/routes/charge');
const loginRouter = require('../src/routes/login');
 const registerRouter = require('../src/routes/register')

const app = express();

dotenv.config();


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



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/charge', chargeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


//Connect to mongodb
async function connectTocluster() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((res) => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

connectTocluster();

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
