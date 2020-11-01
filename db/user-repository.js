const { User } = require('./models');

class NullUser {
  isValid() {
    return false;
  }
  setPassword() {}
  isValidPassword() {
    return false;
  }
  toSafeObject() {
    return {};
  }
}
async function findAll() {
  const users = await User.findAll();
  return users || null;
}

async function create(details) {
  const user = await User.build(details);
  user.setPassword(details.password);
  return await user.save();
}

async function findByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user || new NullUser();
}

async function findByTokenId(tokenId) {
  const user = await User.findOne({ where: { tokenId } });
  return user || new NullUser();
}

module.exports = {
  findAll,
  create,
  findByEmail,
  findByTokenId,
};
