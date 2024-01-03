const express = require('express');
const {search} = require('../controllers/notes');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', search);


module.exports = router;

