const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');

router.use(cookieParser());

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

const authController = require('../controllers/auth-controller.js');

router.get('/login', authController.getLogin);

router.get('/register', authController.getRegister);

router.post('/login', authController.postLogin);

router.post('/register', authController.postRegister);

router.post('/logout', authController.postLogout);

router.get('/', authController.getLoginRegister);

module.exports = router;