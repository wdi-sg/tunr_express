const express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const path = require('path');
const session = require('express-session');

router.use('/:route', express.static(path.join(__dirname, '..', '/public/')));

const authController = require('../controllers/auth-controller.js')

router.get('/login', authController.getLogin);

router.get('/register', authController.getRegister);

router.post('/login', authController.postLogin);

router.post('/register', authController.postRegister);

router.post('/logout', authController.postLogout);

module.exports = router;