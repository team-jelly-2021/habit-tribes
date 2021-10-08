const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');
const router = express.Router();
  
// verify user email and password, create session cookie and store   
router.post('/', userController.verifyUser, cookieController.createSession, (req, res) => {
  if (res.locals.registrationStatus === false) {
    return res.status(401).send('Invalid credentials');
  }
  return res.status(200).send({token: res.locals.token});
});

module.exports = router;