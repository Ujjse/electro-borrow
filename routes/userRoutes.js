const router = require('express').Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/update-info', authenticateUser, userController.updateInfo)

module.exports= router;