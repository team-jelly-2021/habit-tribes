const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');
const router = express.Router();
  
// verify user email and password, create session cookie and store   
router.post('/', userController.verifyUser, cookieController.createSession, (req, res) => {
  const response = res.locals.user
  if (res.locals.registrationStatus === false) {
    return res.status(404).send('User not found');
  }
  console.log(res.locals)
  return res.status(200).send();
});

module.exports = router;