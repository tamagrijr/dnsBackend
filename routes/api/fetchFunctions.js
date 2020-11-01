const express = require('express');

const UserRepository = require('../../db/user-repository');
const { User, channelJoin, groupJoin, Friend, Channel, GroupMessage} = require('../../db/models')

//function for grabbing what a user needs on login

const userInfo = async (tokenId) => {
  const user = await User.findOne({ where: { tokenId: tokenId } })
  const userId = user.id

  const ownedChannels = await Channel.findAll({ where: { ownerId: userId }, order: [['id', 'ASC']] })
  const joinedChannels = await channelJoin.findAll({ where: { userId: userId }, order: [['id', 'ASC']] })
  const joinedGroups = await groupJoin.findAll({ where: { userId: userId } })
  const friends = await Friend.findAll({ where: { userId: userId } })

  let channelsArr = [];
  let returnedChannelArr = [];
  ownedChannels.forEach(channel => {
    channelsArr.push(channel.id)
  })
  joinedChannels.forEach(channel => {
    channelsArr.push(channel.channelId)
  })
  channelsArr.forEach(async channelId => {
    const channel = await Channel.findOne({ where: { id: channelId } })
    returnedChannelArr.push({ id: channel.id, ownerId: channel.ownerId, name: channel.name, avatar: channel.channelAvatar });
  })

  let groupArr = [];
  let returnedGroupArr = [];
  joinedGroups.forEach(group => {
    groupArr.push(group.groupId)
  })
  groupArr.forEach(async (groupId) => {
    const group = await GroupMessage.findOne({ where: {id: groupId } });
    returnedGroupArr.push({ id: group.id, name: group.name });
  })

  let friendsArr =[];
  let returnedFriendsArr =[];
  friends.forEach(friend => {
    friendsArr.push(friend.friendId);
  })
  friendsArr.forEach(async friendId => {
    const friendInfo = await User.findOne({ where: { id: friendId } })
    returnedFriendsArr.push({ id: friendInfo.id,
                              firstName: friendInfo.firstName,
                              lastName: friendInfo.lastName,
                              avatarUrl: friendInfo.avatarUrl,
                              userName: friendInfo.userName,
                              bio: friendInfo.bio,
                            })
  })

  const testImDoingThisWrong = await Channel.findOne({ where: { id: 1 } })
  const testImDoingThisWrong2 = await Channel.findOne({ where: { id: 1 } })
  const testImDoingThisWrong3 = await Channel.findOne({ where: { id: 1 } })

  return {
    user : {
      id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl,
    userName: user.userName,
    bio: user.bio,
    },
    channels: returnedChannelArr,
    groups: returnedGroupArr,
    friends: returnedFriendsArr
  }
}

module.exports ={
  userInfo,
}
