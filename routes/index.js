const router = require("express").Router();

const routes = ['users', 'session', 'channels', 'groups', 'messages'];

for (let route of routes) {
  router.use(`/api/${route}`, require(`./api/${route}`));
}

module.exports = router;
