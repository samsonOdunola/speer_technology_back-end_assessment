const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const {signUp, signIn} = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/login', signIn);
module.exports = router;
