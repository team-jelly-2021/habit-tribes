const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers,(req, res) => {
  const allUsers = res.locals.allUsers;
  if (allUsers) {
    
    return res.status(200).json(allUsers);
  }else{
    return res.json('err in get all users in server.js');
  }

});  

router.post('/allFriends', userController.getAllFriends, (req, res, next) => {
  return res.json(res.locals.friends);
});

router.post('/requests', userController.showFriendRequests, (req, res, next) => {
  return res.json(res.locals.friendRequests);
});

router.post('/', userController.makeFriendRequest, (req, res, next) => {
  // first invoke controller to make friend request
  // return confirmation
  return res.status(200).send('success');
});

router.put('/', userController.acceptFriendRequest, (req, res, next) => {
  // first invoke controller to confirm friend request
  // return confirmation
  return res.status(200).send('success');
});

module.exports = router;