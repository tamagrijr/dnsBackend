const express = require('express');

const UserRepository = require('../../db/user-repository');
const { findByEmail } = require('../../db/user-repository');
const { User, channelJoin, groupJoin, Friend, Channel} = require('../../db/models')

const { asyncHandler } = require('../../utils');
const { authenticated, generateToken } = require('./security-utils');
const { handleValidationErrors, validateUser, validationResult } = require('../../validations');
const { userInfo } = require('./fetchFunctions');

const router = express.Router();

//get a list of all users will probably be removed
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserRepository.findAll();
    res.json(users);
  })
);
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const users = await User.findByPk(req.params.id);
    res.json(users);
  })
);

//create a new user
router.post(
  '/',
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const reqUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      tokenId: ''
    }

    const user = await UserRepository.create(reqUser);

    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();
    res.json({ token, user: user.toSafeObject() });
  })
);

//Join a channel
router.post(
  '/joinChannel',
  validateUser,
  asyncHandler(async(req, res, next) => {
    const reqJoin = {
      userId: req.body.userId,
      channelId: req.body.channelId,
    }
    //make a join table
    const join = await channelJoin.create(reqJoin)
    await join.save()
    res.json(join)
  })
)
//InviteFriendTochannel
router.post(
  '/joinChannel/:friendId(\\d+)/:channelId(\\d+)',
  validateUser,
  asyncHandler(async(req, res, next) => {
    const reqJoin = {
      userId: req.params.friendId,
      channelId: req.params.channelId,
    }
    const checkJoin = await channelJoin.findOne({where: reqJoin})
    //make a join table
    if(!checkJoin){
      const join = await channelJoin.create(reqJoin)
      await join.save()
      res.json(join)
    }else{
      res.json({"already":"joined"})
    }
  })
)
//Join a chat
router.post(
  '/joinGroup',
  asyncHandler(async (req, res, next) => {
    const reqJoin = {
      userId: req.body.userId,
      groupId: req.body.groupId
    }
    //make a join table
    const join = await groupJoin.create(reqJoin)
    await join.save()
    res.json(join)
  })
)
//make a friend
router.post(
  '/makeFriend',
  authenticated,
  asyncHandler(async (req, res, next) => {
    const reqJoin = {
      userId: req.body.userId,
      friendId: req.body.friendId,
    }
    //make a join table
    const join = await Friend.create(reqJoin)
    await join.save()
    res.json(join)
  })
)
router.post(
  '/makeFriendWithEmail',
  authenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const friendEmail = req.body.email
    const friend = await User.findOne({where: {email: friendEmail}})
    const joinCheck = await Friend.findOne({where: {userId:userId, friendId:friend.id}})
    if(!joinCheck){
      const join = await Friend.create({userId: userId, friendId: friend.id})
      await join.save()
      res.json(join)
    }else{
      res.json({"already":"friends"})
    }
  })
)

//update general user information not password/email
router.put(
  '/',
  authenticated,
  asyncHandler(async (req, res) => {
    const tokenId = req.user.tokenId;
    const reqUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      bio: req.body.bio,
      avatarUrl: req.body.avatarUrl
    }
    // console.log(req.body)
    // console.log(reqUser)
    const user = await User.update(reqUser, { where: { tokenId: tokenId } })
    // await user.update(reqUser);
    res.json(user);
  })
)

//delete a single user who is authenticated
router.delete(
  '/',
  authenticated,
  asyncHandler(async (req, res) => {
    const user = req.user
    await user.destroy();
    res.json({ "delete": "complete" })
  })
)
//delte friend by user
router.delete(
  '/delete/:friendId(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const friendId = req.params.friendId
    const join = await Friend.findOne({where : {userId: userId, friendId: friendId}})
    const join2 = await Friend.findOne({where : {userId : friendId, friendId: userId}})
    if(join) join.destroy()
    if(join2) join2.destroy()
    res.json({"dletion":"complete"})
  })
)

//userInfo Route
router.get(
  '/userInfo',
  authenticated,
  asyncHandler(async (req, res) => {
    const tokenId = req.user.tokenId;
    const obj = await userInfo(tokenId);
    res.json(obj);
  })
)


router.get('/me', authenticated, (req, res) => {
  res.json({
    email: req.user.email,
    name: req.user.name,
  });
});

module.exports = router;
