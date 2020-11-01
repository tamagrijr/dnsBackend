const express = require('express');

const { Message, Channel, User, channelJoin } = require('../../db/models')
const { asyncHandler } = require('../../utils');
const { authenticated } = require('./security-utils');

const router = express.Router();

/*GET REQUESTS--------------------------------------------------------- */
//getchannel by owner
router.get(
  '/',
  authenticated,
  asyncHandler(async (req, res) => {
    const channels = await Channel.findAll({
      where: {
        ownerId: req.body.userId
      }
    });
    res.json(channels)
  })
)

//get channel by id
router.get(
  '/:id(\\d+)',
  // authenticated,
  asyncHandler(async (req, res) => {
    const channelId = req.params.id;
    const channel = await Channel.findOne({ where: { id: channelId } });
    res.json(channel)
  })
)

// get channel messages
router.get(
  '/:id(\\d+)/message',
  authenticated,
  asyncHandler(async (req, res) => {
    const channelId = req.params.id;
    const messages = await Message.findAll({where: { channelId: channelId } ,
                                            include: [{ model:User,
                                                        attributes: ["id", "firstName", "lastName", "userName", "avatarUrl"]
                                                      }],
                                            order: [['id', 'ASC']]
                                            })
    // console.log(messages)
    // console.log('test-----------------------------------------------------------------------------')
    res.json(messages);
  })
)
//GET CHANNEL MEMBERS
router.get(
  '/:id(\\d+)/members',
  authenticated,
  asyncHandler(async (req, res) => {
    const channelId = req.params.id;
    const members = await channelJoin.findAll({ where: {channelId : channelId},
                                                include: [{ model:User,
                                                            attributes: ["id", "firstName", "lastName", "userName", "avatarUrl"]
                                                          }]
                                              })
    res.json(members)
  })
)


/*POST REQUESTS--------------------------------------------------------- */
//make a new channel
router.post(
  '/',
  authenticated,
  asyncHandler(async (req, res) => {
    const reqChannel = {
      name: req.body.name,
      ownerId: req.body.userId,
      channelAvatar: req.body.avatarUrl
    }
    const channel = await Channel.create(reqChannel);
    await channel.save();
    res.json(channel)
  })
)
//post a message to a channel
router.post(
  '/:id(\\d+)/message',
  authenticated,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const channelId = req.params.id;
    const message = req.body.message;

    reqMessage = {
      userId: userId,
      channelId: channelId,
      message: message,
    }
    const resMessage = await Message.create(reqMessage);
    await resMessage.save();
    res.json(resMessage)
  })
)

/*PUT REQUESTS--------------------------------------------------------- */

/*DELETE REQUESTS--------------------------------------------------------- */
router.delete(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    const channel = await Channel.findOne({
      where: { id: req.params.id }
    })
    channel.destroy();
    res.json({ "deletion": "complete" })
  })
)
router.delete(
  '/:groupId(\\d+)/:userId(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    await channelJoin.destroy({ where: {userId: req.params.userId, channelId: req.params.groupId}})
    res.json({ "deletion": "complete" })
  })
)

module.exports = router;
