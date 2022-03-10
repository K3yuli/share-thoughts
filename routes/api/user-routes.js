const router = require('express').Router();

// import functionality and hook up with routes
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up GET all & POST at api/users
router
.route('/')
.get(getAllUser)
.post(createUser);

// set up GET one, PUT, & DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/user/:userId/:friend/:friendId POST DELETE
router
.route('/:id/friend/:friendId')
.post(addFriend)
.delete(deleteFriend);



module.exports = router;

