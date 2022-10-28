const router = require('express').Router();

const homeController = require('../contollers/home.controller')

router.get('/', homeController.getHome);

module.exports = router;