// var createError = require('http-errors')
require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const error = require('./utils/error')
const customResponse = require('./middleware/custom-response')
const pino = require('pino')
const pinoHttp = require('pino-http')
const moment = require('moment')
const { initializeApp, cert } = require('firebase-admin/app')
const accessLogStream = require('./logger/access-stream')

const indexRouter = require('./routes/index')
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

// const errorHandler = require('./middleware/error')
moment.locale('th')

const app = express()

const serviceAccount = require('./sys1-319107-firebase-adminsdk-1pa58-3d01087f80.json')
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://sys1-319107.firebaseio.com',
})

app.use(helmet())
app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Accept, Origin, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Content-Range, Range'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET') //to give access to all the methods provided
    return res.status(200).json({})
  }
  next()
})

/**
 * Logger
 */
app.use(
  pinoHttp({
    logger: pino(
      {
        timestamp: () => {
          return `,"time": "${moment().format()}"`
        },
      },
      accessLogStream
    ),
    genReqId: (req) => {
      return req.id
    },
    customLogLevel: function (res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
      } else if (res.statusCode >= 500 || err) {
        return 'error'
      }
      return 'info'
    },
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * custom response
 */
app.use(customResponse())

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
/**
 * API V2
 */
const API_V2_PREFIX = '/api/v2'
app.use(`${API_V2_PREFIX}/bl-car-nos`, require('./routes/api/v2/bl-car-nos'))
app.use(`${API_V2_PREFIX}/bl-id-cards`, require('./routes/api/v2/bl-id-cards'))
app.use(`${API_V2_PREFIX}/bl-names`, require('./routes/api/v2/bl-names'))
app.use(`${API_V2_PREFIX}/cr-reg-persons`, require('./routes/api/v2/cr-reg-persons'))
app.use(`${API_V2_PREFIX}/cr-reg-trucks`, require('./routes/api/v2/cr-reg-trucks'))
app.use(`${API_V2_PREFIX}/ts-contract`, require('./routes/api/v2/ts-contract'))
app.use(`${API_V2_PREFIX}/ts-prices`, require('./routes/api/v2/ts-prices'))
app.use(`${API_V2_PREFIX}/ts-province`, require('./routes/api/v2/ts-province'))
app.use(`${API_V2_PREFIX}/ts-retail`, require('./routes/api/v2/ts-retail'))
app.use(`${API_V2_PREFIX}/ts-trader`, require('./routes/api/v2/ts-trader'))
app.use(`${API_V2_PREFIX}/ts-truck-type`, require('./routes/api/v2/ts-truck-type'))

// // catch 404 and forward to error handler
// app.use(errorHandler)

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })
// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
