var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')

const users = require('./routes/users')
const auth = require('./routes/auth')

const ts_trader = require('./routes/ts_trader')
const ts_trucktype = require('./routes/ts_trucktype')
const ts_retail = require('./routes/ts_retail')
const ts_prices = require('./routes/ts_prices')
const ts_contract = require('./routes/ts_contract')
const ts_province = require('./routes/ts_province')
const bl_carnos = require('./routes/bl_carnos')
const bl_idcards = require('./routes/bl_idcards')
const bl_names = require('./routes/bl_names')
const cr_reg_persons = require('./routes/cr_reg_persons')
const cr_reg_trucks = require('./routes/cr_reg_trucks')

const errorHandler = require('./middleware/error')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)
app.use('/api/v1/users', users)
app.use('/api/v1/ts_retail', ts_retail)
app.use('/api/v1/ts_trader', ts_trader)
app.use('/api/v1/ts_trucktype', ts_trucktype)
app.use('/api/v1/ts_prices', ts_prices)
app.use('/api/v1/ts_contract', ts_contract)
app.use('/api/v1/ts_province', ts_province)
app.use('/api/v1/bl_carnos', bl_carnos)
app.use('/api/v1/bl_idcards', bl_idcards)
app.use('/api/v1/bl_names', bl_names)
app.use('/api/v1/cr_reg_persons', cr_reg_persons)
app.use('/api/v1/cr_reg_trucks', cr_reg_trucks)
app.use('/api/v1/auth', auth)

// catch 404 and forward to error handler
app.use(errorHandler)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
