const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./models/usersDatabaseModels.js');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
require('dotenv').config();

const decodeIDToken = require('./utils/authenticateToken.js')

const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const habitsPageRouter = require('./routes/habitsPageRouter');
const videoRouter = require('./routes/videoRouter');
const friendsRouter = require('./routes/friendsRouter');
const dailyRouter = require('./routes/dailyRouter');
const isAuthenticated = require('./utils/isAuthenticated')






cron.schedule('59 59 23 * * *', () => {
  app.use('/daily', dailyRouter);
});

// allow api for parsing json
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(cookieParser());

// verify tokens from client side
app.use(decodeIDToken);

// allow api to receive data from client app
// app.use(express.urlencoded());

// express rendering of static imgs, etc.
app.use(express.static(__dirname + "../public"));

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/habits', isAuthenticated, habitsPageRouter);
app.use('/api/friends', friendsRouter);

app.use((req, res) => {
  res.status(404).send('File not found');
});
// app.use('/video', videoRouter);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/

