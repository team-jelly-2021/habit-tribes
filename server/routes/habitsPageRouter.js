const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')
const helperController = require('../controllers/helperController');
// const videoController = require('../controllers/videoController.js');


router.get('/', 
/* cookieController.verifyToken,  userController.getMyHabits, userController.myTodayGoals, userController.checkProgress, */ 
  userController.getHabits,
  (req, res, next) => {
    // first invoke controller to retrieve list of all habits at current date for current user
    // return list
    return res.status(200).json(res.locals.rows);
});
  
// TODO: Explain change from /addHabit to / to the team
router.post('/', userController.addHabit, (req, res, next) => {
  // first invoke controller to write to DB info for new habit
  // return updated list of today's goals
  return res.status(201).json(res.locals.habit)
});

router.post('/:habitId/done', userController.completeHabit, (req, res, next) => {
  return res.sendStatus(204)
})

router.delete('/:habitId', userController.deleteHabit, (req, res, next) => {
  return res.status(203).json(res.locals.habit)
})

router.put('/completed/:id', userController.setOneHabitStatus, (req, res, next) => {
  return res.status(200).send(res.locals.habitStatus);
});

router.get('/settings', (req, res, next) => { //stretch
  // first invoke middleware to retrieve all the user's account settings
  // return all user's current settings (so we can display their current selections)

});

router.put('/settings', (req, res, next) => { //stretch
  // first invoke controller to write to DB updated settings info 
  // return confirmation w new settings info to re-render page
});


module.exports = router;