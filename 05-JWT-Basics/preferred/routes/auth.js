const express = require('express');
const { login, getHello } = require('../controllers/userController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// POST /api/v1/logon
router.post('/logon', login);

// GET /api/v1/hello
router.get('/hello', authenticate, getHello);

module.exports = router;