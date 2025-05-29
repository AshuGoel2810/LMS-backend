const express = require('express');
const router = express.Router();
const { loginUser, registerUser, courseUser, coursesGet } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post("/courses", coursesGet);
router.get("/courses", courseUser);

module.exports = router;
