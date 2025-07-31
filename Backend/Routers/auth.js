const express = require('express');
const { signup, login } = require('../Controller/authControl');
const { protect } = require('../Middeware/protect')
const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/checkAuth', protect, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
})


module.exports = router;