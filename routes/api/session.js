const express = require('express');
const asyncHandler = require('express-async-handler');

const UserRepository = require('../../db/user-repository');
const { authenticated, generateToken } = require('./security-utils');
const { validateEmailAndPassword, validationResult } = require('../../validations');

const router = express.Router();

router.put(
  '/',
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (!user.isValidPassword(password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid credentials'];
      return next(err);
    }
    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();
    res.json({ token, user: user.toSafeObject() });
  })
);

router.delete(
  '/',
  [authenticated],
  asyncHandler(async (req, res) => {
    req.user.tokenId = null;
    await req.user.save();
    res.json({ message: 'success' });
  })
);

module.exports = router;
