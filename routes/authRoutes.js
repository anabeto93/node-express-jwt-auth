const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.get_signup);
router.post('/signup', authController.signup);
router.get('/login', authController.get_login);
router.post('/login', authController.login);

module.exports = router;
