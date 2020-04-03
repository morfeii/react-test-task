'use strict'

////
// CONFIGURATION SETTINGS
////
require('dotenv/config')

const PORT = process.env.PORT || 4000
const PRETTY_PRINT_JSON = true
var UPDATE_INTERVAL = 5000

////
// START
////
var express = require('express')
var http = require('http')
var io = require('socket.io')
var cors = require('cors')

var app = express()
app.use(cors())
var server = http.createServer(app)

var io = io.listen(server)
io.set('origins', '*:*')

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', function(socket) {
  socket.on('ticker', function(ticker) {
    trackTicker(socket, ticker)
  })

  socket.on('changeInterval', ms => {
    if (ms < 0) throw new Error('The update interval cannot be less than zero')
    UPDATE_INTERVAL = ms
  })
})

server.listen(PORT, () => console.log('Server is running on port:', PORT))

function getRandomValBetween(min, max, precision) {
  min = min === undefined ? 0 : min
  max = max === undefined ? 9007199254740992 : max
  precision = precision === undefined ? 0 : precision

  var random = Math.random() * (max - min) + min

  return random.toFixed(precision)
}

function getUTCDate() {
  var now = new Date()
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  )
}

function generateQuote(stockSymbol) {
  return {
    stockSymbol,
    exchange: 'NASDAQ',
    price: getRandomValBetween(250, 300, 2),
    change: getRandomValBetween(0, 200, 2),
    change_percent: getRandomValBetween(0, 1, 2),
    last_trade_time: getUTCDate(),
    dividend: getRandomValBetween(0, 1, 2),
    yield: getRandomValBetween(0, 2, 2),
    updateInterval: UPDATE_INTERVAL
  }
}

function sendQuote(socket, stockSymbol) {
  const quote = generateQuote(stockSymbol)

  socket.emit(
    stockSymbol,
    PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote)
  )
}

function trackTicker(socket, stockSymbol) {
  let interval = null

  const runUpdating = () => {
    const time = UPDATE_INTERVAL
    interval = setInterval(() => {
      if (time == UPDATE_INTERVAL) {
        sendQuote(socket, stockSymbol)
        return
      }

      // Clear and set new interval time
      clearInterval(interval)
      runUpdating()
    }, UPDATE_INTERVAL)
  }

  // run the first time immediately
  sendQuote(socket, stockSymbol)
  runUpdating()

  socket.on('disconnect', function() {
    clearInterval(interval)
  })
}
