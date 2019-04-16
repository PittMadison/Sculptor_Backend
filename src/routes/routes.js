const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

//AUTH
//@POST/REGISTRATION

router.post('/register', userController.newUser);


router.post('/login', userController.login);


router.get('/logout', userController.logout);

router.put('/update', userController.update);



module.exports = router;