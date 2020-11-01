const express = require('express');

const { GroupMessage, Message, User, groupJoin } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('./security-utils');

const router = express.Router();

/*GET REQUESTS--------------------------------------- */
//get group by id
router.get(
  '/:id(\\d+)',
  // authenticated,
  asyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const group = await GroupMessage.findOne({ where: { id: groupId } });
    res.json(group)
  })
)

//get group messages
router.get(
  '/:id(\\d+)/message',
  authenticated,
  asyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const messages = await Message.findAll({where: { groupId: groupId } ,
                                            include: [{ model:User,
                                                        attributes: ["firstName", "lastName", "userName", "avatarUrl"]
                                                      }],
                                            order: [['id', 'ASC']],
                                            })

    res.json(messages);
  })
)
/*POST REQUESTS--------------------------------------- */

//Make a group
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const reqChat = {
      name: req.body.name,
    }
    const chat = await GroupMessage.create(reqChat);
    await chat.save();
    res.json(chat)
  })
)
//MAKE A GROUP WITH AN ID PARAM
router.post(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const chat = await GroupMessage.create({name: req.body.name});
    await chat.save();
    const chatId = chat.dataValues.id;
    const join = await groupJoin.create({userId: req.params.id, groupId: chatId})
    await join.save()
    res.json(chat)
  })
)

//post a message to a group
router.post(
  '/:id(\\d+)/message',
  authenticated,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const groupId = req.params.id;
    const message = req.body.message;

    reqMessage = {
      userId: userId,
      groupId: groupId,
      message: message,
    }
    const resMessage = await Message.create(reqMessage);
    await resMessage.save();
    res.json(resMessage)
  })
)

/*PUT REQUESTS--------------------------------------- */

/*DELETE REQUESTS--------------------------------------- */
router.delete(
  '/:groupId(\\d+)/:userId(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    await groupJoin.destroy({ where: {userId: req.params.userId, groupId: req.params.groupId}})
    res.json({"deletion": "complete"})
  })
)

module.exports = router;
