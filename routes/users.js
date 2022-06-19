const router = require('express').Router();
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/users');

router.get('/', getUser);
router.post('/', createUser);
router.get('/', updateUser);
router.post('/', deleteUser);

module.exports = router;