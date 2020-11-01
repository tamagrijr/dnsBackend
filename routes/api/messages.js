const express = require('express');

const { Channel, Message } = require('../../db/models')
const { asyncHandler } = require('../../utils');
const { authenticated } = require('./security-utils');

const router = express.Router();

router.put(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    const message = await Message.findOne({where:{id: req.params.id}})
    if(!message.pinned){
      message.update({pinned: true})
    }else{
      message.update({pinned: false})
    }
    res.json(message)
  })
)
router.delete(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async (req, res) => {
    const message = await Message.findOne({where: { id: req.params.id }})
    message.destroy()
    res.json({"deletion": "complete"})
  })
)

module.exports = router;
