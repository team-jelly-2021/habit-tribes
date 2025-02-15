const bcrypt = require('bcrypt');
const db = require('../models/usersDatabaseModels.js');

const helperController = {};


helperController.getToday = async (req, res, next) => {
  try {
    // TODO: Why query the database rather than Date.now() ?
    const today = await db.query('SELECT today FROM today');
    res.locals.today = today.rows[0]['today'];
    return next();
  } catch (err) {
    return next({'err': err, message: 'getToday query failed in helperController.getToday'});
  }
}

helperController.updateNotCompleted = async (req, res, next) => {
   // UPDATE all entries in users_habits_join where completed_today = false: increment its days_missed value and reset days_since_missed to 0

   return next();
  }

helperController.updateCompleted = async (req, res, next) => {
  // UPDATE all entries in users_habits_join where completed_today = true: increment its total_days_achieved and days_since_missed values
    // set all completed_today values to false
    return next();
  }

helperController.incrementToday = async (req, res, next) => {
  // UPDATE all entries in users_habits_join where completed_today = true: increment its total_days_achieved and days_since_missed values
    // set all completed_today values to false
  return next();
}

module.exports = helperController;