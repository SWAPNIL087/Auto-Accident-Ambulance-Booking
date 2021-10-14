const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const schedule = require('node-schedule')
const bcrypt = require('bcryptjs')

const User = require('../models/users')
const authenticate = require('../middleware/authenticate')


module.exports = router;