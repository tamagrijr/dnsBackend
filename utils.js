const { Message, User } = require('./db/models')


const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const addMessageToChannel = async (userId, channelId, messageContent) => {
  try{
    const newMessage = {
      userId: userId,
      channelId: channelId,
      message: messageContent,
    }
    const message = await Message.create(newMessage)
    return message;
  }catch(e){
    console.error(e);
  }
}
const getUserInfo = async (userId) => {
  const user = await User.findOne({where: {id: userId}})
  const userInfo = {firstName: user.firstName, lastName: user.lastName, userName: user.userName, avatarUrl: user.avatarUrl}
  return userInfo
  }


module.exports = { asyncHandler, addMessageToChannel };
