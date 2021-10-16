const bcrypt = require('bcrypt');
const encryptHelper = require('../utils/encryptHelper');
const fs = require('fs')
const path = require('path')
const { getDate } = require('../utils/getDate')
const db = require('../models/usersDatabaseModels.js');
const admin = require('firebase-admin');

const userController = {};

userController.getAllUsers = async (req, res, next) => {
  next()
}
// create user controller for registerRouter
userController.createUser = async (req, res, next) => {
  try {
    const SALT_WORK_FACTOR = 10;
    // pull out name, email, password & phone number from request body registration page
    const { name, email, password, phoneNumber } = req.body;

    // if name, email or password are null, registration status is false
    if (password === null || email === null || name === null) {
      res.locals.registrationStatus = false;
      return next();
    }

    // generate salt and bcrypt password
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const crypt_password = await bcrypt.hash(password, salt);

    // query for current time (need for time zone)
    const timeQuery = `SELECT NOW();`
    const timeResults = await db.query(timeQuery);
    const time = timeResults.rows[0].now;

    // add user to database 
    const addUserQuery = `INSERT INTO users (name, email, password, phone_number, timezone, darkmode_setting)
    VALUES ($1, $2, $3, $4, $5, $6);`;
    const values = [ name, email, crypt_password, phoneNumber, time, true ];
    const addedUser = await db.query(addUserQuery, values);
    
    // store user in res.locals
    res.locals.user = { name: name, email: email };
    res.locals.registrationStatus = true;
    return next();
  }
  catch (error) {
    return res.status(400).send('Invalid input');
  }
};


// create user controller for registerRouter
userController.createShadowUser = async (req, res, next) => {
  try {
    // pull out name, email, password & phone number from request body registration page
    const { uid, fullName, email } = req.body;

    // if name, email or password are null, registration status is false
    if (uid === null || fullName === null || email === null) {
      res.locals.registrationStatus = false;
      return next();
    }

    // add user to database 
    const addUserQuery = `INSERT INTO user_cache (uid, full_name, email) VALUES ($1, $2, $3);`;
    const addedUser = await db.query(addUserQuery, [uid, fullName, email]);
    res.locals.user = addedUser;
    res.locals.registrationStatus = true;
    return next();
  }
  catch (error) {
    console.log(error);
    return res.status(400).send('Invalid input');
  }
};


// verify user controller for loginRouter
userController.verifyUser = async (req, res, next) => {
  try {
    // users will login with email and password, deconstruct from request body
    const { email, password } = req.body;

    // database query to find user
    const findUserQuery = `SELECT password, name, email
    FROM users WHERE email = $1;`;
    const value = [email] ;
    const returnedQuery = await db.query(findUserQuery, value);

    // if returned results does not give back user, redirect back to register page:
    if (returnedQuery.rows[0] === undefined) {
      res.locals.registrationStatus = false;
      return next();
    }

    // take returned hashed password from query and compare to entered password from login req.body 
    const hashedPassword = returnedQuery.rows[0].password;
    const verify = await bcrypt.compare(password, hashedPassword);
  
    // if verification is false, redirect to login page
    if (verify === false) {
      res.locals.registrationStatus = false;
      return next();
    }
  
    else {
      res.locals.user = {
        name: returnedQuery.rows[0]['name'],
        email: returnedQuery.rows[0]['email'],
      };
      res.locals.registrationStatus = true;
      req.app.locals.email = {email: returnedQuery.rows[0]['email']};
      
      return next();
    }
  }

  catch (error) {
    return next (error);
  }
};


userController.deleteAccount = async (req, res, next) => {}; //stretch


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns void
 */
userController.addHabit = async (req, res, next) => {
  res.locals.user = 1 // temp variable until auth provides user_id
  const { name, reminder, frequency, isPrivate } = req.body
  try {
    const query = 'INSERT INTO habit (name, user_id, reminder, frequency, private) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const { rows: [ habit ]} = await db.query(query, [
      name,
      res.locals.user,
      reminder,
      frequency,
      isPrivate
    ]);
    res.locals.habit = habit
  } catch(e) {
    next(e)
  }
  next()
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns void
 */
userController.getHabits = async (req, res, next) => {
  const userId = req.currentUser.user_id;
  const sql = fs.readFileSync(path.join(__dirname, '../queries/get_habits.sql')).toString();
  try {
    const { rows } = 
      await db.query(sql, [userId]);
    res.locals.rows = rows ?? [];
  } catch(e) {
    next(e);
  }
  next();
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns void
 */
userController.deleteHabit = async (req, res, next) => {
  if (!req.params.habitId) return next()
  try {
    const { rows } = await db.query('DELETE FROM habit WHERE id = $1 RETURNING *', [req.params.habitId])
    res.locals.habit = rows[0]
  } catch(e) {
    next(e)
  }
  next()
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns void
 */
userController.completeHabit = async (req, res, next) => {
  if (!req.params.habitId) return next()
  try {
    await db.query('INSERT INTO habit_log (habit_id, date_completed) VALUES ($1, now())', [req.params.habitId])
  } catch(e) {
    next(e.message)
  }
  next()
}

userController.setOneHabitStatus = async (req, res, next) => {
  const{ completedToday } = req.body;
  // use req.params.id to refer to the correct habit. id should === habit_id (habit name)
  const habitId = req.params.id;
  const email  = res.locals.email;
  //update user_habits_join where habit_id === req.params.id & user_id === req.cookies.email, set completed_today = $1
  const statusQuery = `UPDATE user_habits_join WHERE habit_id = ${habitId} AND user_id = ${email} SET completed_today = $1`; 
  try {
    const status = await db.query(statusQuery, [completedToday]).rows[0]['completed_today'];
    //client will click a status button which value is boolean;
    res.locals.habitStatus = status;
    return next();
  } catch (err) {
    return next({'err': err, message: 'query failed in userController.setOneHabitStatus'});
  }
};


userController.getMyHabits = async (req, res, next) => {
  //in verifyUser, res.locals.user = {name: name, email: email}. 
  const email = res.locals.email || 'test@gmail.com';
  const getMyHabitsQuery = `SELECT * FROM users_habits_join WHERE users_id = $1`;
  try {
    const myHabits = await db.query(getMyHabitsQuery, [email]);
    res.locals.myHabits = myHabits.rows;
    return next();
  } catch (err) {
    return next({'err': err, message: 'query failed in userController.getMyHabits'});
  }
};


userController.myTodayGoals = async (req, res, next) => {
  //in getMyHabits, res.locals.myHabits = myHabits.rows;
  const email = res.locals.email || 'test@gmail.com';
  const today = res.locals.today;
  const myHabits = res.locals.myHabits;//[{1~12},{1~12}]
  // const allUsersTodayQuery = `SELECT * FROM user_habit_calendar WHERE days_since_launch = $1`;
  // let allUsersToday;
  // try {
  //   allUsersToday = await db.query(allUsersTodayQuery, [today]);
  //   console.log('allUsersToday @@@@@@@@@@@@@@@@@@@@@@ >>>', allUsersToday);
  // } catch (err) {
    // return next({err, message: 'query failed in userController.myTodayHabits'});
  // }
  const curUserTodayQuery = 'SELECT users_habits_join.* FROM users_habits_join JOIN user_habit_calendar ON user_habit_calendar.user_habits_join_id = users_habits_join._id WHERE user_habit_calendar.days_since_launch = $1 AND users_habits_join.users_id = $2';
  let todayGoals;
  try {
    allCalendar = await db.query('SELECT * FROM user_habit_calendar');
    // console.log('allCalendar @@@@@@@@@@@@@@@@@@@@@@ >>>', allCalendar);
    todayGoals = await db.query(curUserTodayQuery, [today, email]);
    // console.log('todayGoals @@@@@@@@@@@@@@@@@@@@@@ >>>', todayGoals);
  } catch (err) {
    return next({err, message: 'query failed in userController.myTodayHabits'});
  }
  //retrieve list of habit names & completed_today values from user_habits_join corresponding to current users_id, that have a users_habits_join_id in the user_habit_calendar on the current day 
  //(How this query works: first find all entries in user_habit_calendar where days_since_launch = today. Also find all users_habits_join entries with users_id of current user. Then filter the list from user_habit_calendar further to only include entries with users_habits_join_id’s that occur on the list from users_habits_join. )
  res.locals.todayGoals = todayGoals.rows;
  return next(); 
};

userController.checkProgress = async (req, res, next) => {
  console.log('in get checkProgress');
  // - for each entry in the res.locals.todayGoals, compare its days_missed value with its days_missed_until_reminder value. if they equal each other for any of the entries, redirect to GET /video
  // EXCEPT, we can't just redirect because we need habitsPageRouter get '/' to finish & return its list of today's habits... so how can we handle this?
  // can we open a new request from here without interrupting the current request?
  // or, do we send back a confirmation to the client that it's time to display video, upon recieving which the client makes a new get request to /video?
  return next();
}

userController.makeFriendRequest = async (req, res, next) => {
  const initiatingFriend = req.currentUser.uid;
  const invitedFriend = req.body.invitedFriend;

  const newRequestQry = 'INSERT INTO friends (friend_a, friend_b) VALUES ($1, $2)';

  try {
    let qry = await db.query(newRequestQry, [initiatingFriend, invitedFriend]);
    return next();
  } catch (err) {
    next({err, message: 'Failed to create invitation'});
  }
};

userController.acceptFriendRequest = async (req, res, next) => {
  const friendshipID = req.body.friendshipID;
  const invitee = req.currentUser.uid;

  const acceptRequestQry = 'UPDATE friends SET request_accepted = TRUE WHERE _id = $1 AND friend_b = $2';

  try {
    const result = await db.query(acceptRequestQry, [friendshipID, invitee]);
    console.log('update rowcount', result.rowCount);
    if (result.rowCount > 0) return next();
    else next({message: 'Accepting friend request failed - invalid request'});
  } catch (err) {
    next({err, message: 'Accepting friend request failed'});
  }
};

userController.removeFriend = async (req, res, next) => {
  const friendshipID = req.body.friendshipID;
  const invitee = res.currentUser.uid;

  const removeFriendQry = 'DELETE FROM friends WHERE (_id = $1 AND friend_a = $2) OR (_id = $1 AND friend_b = $2)';

  try {
    const result = await db.query(removeFriendQry, [friendshipID, invitee]);
    if (result.rowCount > 0) return next();
    else next({err, message: 'Invalid friendship for deletion.'});
  } catch (err) {
    next({err, message: 'Failed to remove friend link'});
  }

};

userController.showFriendRequests = async (req, res, next) => {
  const invitee = req.currentUser.uid;
  console.log(invitee);
  const friendReqQry = `
      SELECT  f.friend_a,
              a.full_name,
              a.uid,
              f.friend_b,
              b.full_name,
              b.uid,
              f.request_accepted
      FROM friends f
      INNER JOIN user_cache a
      ON f.friend_a = a.uid
      INNER JOIN user_cache b
      ON f.friend_b = b.uid
      WHERE f.friend_a = $1 OR f.friend_b = $1 AND f.request_accepted = FALSE`;

  try {
    const result = await db.query(friendReqQry, [invitee]);
    res.locals.friendRequests = result.rows;
    next();
  } catch (err) {
    next({err, message: 'Failed to retrieve friend requests'});
  }
};

userController.getAllFriends = async (req, res, next) => {
  const user = req.currentUser.uid;
  //const friendReqQry = `SELECT * FROM friends WHERE friend_a = $1 OR friend_b = $1 AND request_accepted = TRUE`;

  const friendReqQry = `
      SELECT  f.friend_a,
                  a.full_name,
                  a.uid
                  f.friend_b,
                  b.full_name,
                  b.uid,
                  f.request_accepted
      FROM friends f
      INNER JOIN user_cache a
      ON f.friend_a = a.uid
      INNER JOIN user_cache b
      ON f.friend_b = b.uid
      WHERE f.friend_a = $1 OR f.friend_b = $1 AND f.request_accepted = TRUE`;

  try {
    const result = await db.query(friendReqQry, [user]);
    res.locals.friends = result.rows;
    next();
  } catch (err) {
    next({err, message: 'Failed to retrieve friend list'});
  }
};

userController.findUser = async (req, res, next) => {
  const query = req.query.query;
  console.log('qry', process.env.CRYPTO_KEY);
  const userQuery = 'SELECT * from user_cache WHERE (lower(full_name) LIKE $1) OR (lower(email) = $1)';

  try {
    const output = [];
    const result = await db.query(userQuery, [query.toLowerCase()]);
    console.log('rows', result.rows);
    result.rows.forEach(row => {
      const rowOutput = {}
      rowOutput.uid = row.uid;
      rowOutput.full_name = row.full_name;
      output.push(rowOutput);
    });

    res.locals.results = output;
    next();
  } catch (err) {
    next({err, message: 'Failed to perform user search'});
  }
};

userController.changeDarkmodeSetting = async (req, res, next) => {};

userController.changePushNotificationSetting = async (req, res, next) => {};

userController.changeTextNotificationSetting = async (req, res, next) => {}; //stretch


module.exports = userController;
