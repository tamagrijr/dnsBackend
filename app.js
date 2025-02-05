const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const helmet = require('helmet');
const path = require('path');
const { Channel } = require('./db/models')
const { environment } = require('./config/index');
const { addMessageToChannel, getUserInfo } = require('./utils')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// const io = require('socket.io')(http, {
//   cors: true,
//   origins: ['http://localhost:3000', 'https://tamagrijr.github.io/dnsFrontend/', 'https://tamagrijr.github.io'],
// });

const whitelist = ['http://localhost:3000', 'https://tamagrijr.github.io/dnsFrontend', 'https://tamagrijr.github.io'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, { origin: true })
    }
    callback(new Error('Not allowed by CORS'));
  }
}

// const allowedOrigins = ["http://localhost:3000", 'https://tamagrijr.github.io/dnsFrontend/', 'https://tamagrijr.github.io'];
// app.use(function(req, res, next) {
//   let origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
//   }

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use(cors(corsOptions));
app.use(helmet({ hsts: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/******************* Routes *******************/

const indexRouter = require('./routes/index');

app.use(indexRouter); //starter route... add more as needed

/******************* Socket Io *******************/

io.on('connection', async (socket) => {
  console.log(`${socket.id} -- Connected`);

  socket.on('join', async (channelId) => {
    const channel = await Channel.findByPk(channelId);
    if (channel) {
      socket.join(`channel${channel.id}`, async () => {
        console.log(`${socket.id} has joined ${channel.name}`);
      });
    }
  });

  const channels = await Channel.findAll();
  for (let channel of channels) {
    console.log(`listening for messages from ${channel.name}`);
    socket.on(`channel${channel.id}`, async ({ userId, message, channelId }) => {
      console.log(`${channel.name} -- working`);
      const newMessage = await addMessageToChannel(userId, channelId, message)
      socket.to(`channel${channel.id}`).emit(`channel${channel.id}`, newMessage);
      socket.emit(`channel${channel.id}`, newMessage);
    });
  }

});

/*************** Error Handlers ***************/
app.use(function (_req, _res, next) {
  // console.log(`-----------------------------404`)
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  const isProduction = environment === "production";
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
    stack: isProduction ? null : err.stack,
  });
});

/***********************************************/
module.exports = http;
