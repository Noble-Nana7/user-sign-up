const router = require('express').Router();

const { createUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validator');


router.post('/user', validateUser, createUser);

module.exports = router;