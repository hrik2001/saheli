const express = require('express')
const authController = require('../controllers/auth')
const geoController = require('../controllers/geo')
const auth = require("../middleware/auth")

const router = express.Router();

router.post('/signup' , authController.signup)
router.get('/login' , authController.login)
router.post('/location' , auth, geoController.location)
router.post('/nearme' , auth, geoController.nearme)
router.post('/vehicle' , auth, geoController.vehicle)
router.post('/destination' , auth, geoController.destination)
router.post('/range' , auth, geoController.range)
router.post('/outside' , auth, geoController.outside)

module.exports = router
