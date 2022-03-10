// pull user from models directory
const { User } = require('../models');

const userController = {
    // functions go here as methods

    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .populate({
            path: 'friend',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    // & populate thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .populate({
            path: 'friend',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // if no User found send 404
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
        })
        // handle error
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create User - POST
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // POST add new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $push: { friend: params.friendId}},
            { new: true}
        )
        .populate(
            {
                path: 'friend',
                select: ('-__v')
            }
        )
        .select('-__v')

        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // update (PUT) user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id },
            { $pull: {
                friend: params.friendId
            }},
            { new: true }
        )
        .populate({
            path: 'friend',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
    
    // **BONUS ** DELETE a user's associated thoughts when deleted

};

module.exports = userController;