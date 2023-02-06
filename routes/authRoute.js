const express = require('express');
const { createUser, loginUser, getAllUsers, getSingleUser, deleteUser, updateUser} = require('../controllers/UserController');
const router = express.Router()

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/allusers', getAllUsers);
router.get('/:id', getSingleUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);


module.exports = router;