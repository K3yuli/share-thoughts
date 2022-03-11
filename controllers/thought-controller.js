const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reaction',
            select: '-__v'})
            .select('-__v')

        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // get a single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reaction',
            select: '-__v'
        })
        .select('-__v')

        .then(dbThoughtData => {
            // if no thought found send 404
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        })
        // handle error
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // add POST thought to a user
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thought: _id } },
            { new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // POST to create a reaction stored in a single thought's reaction array
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId 
            },
            {
                $push: {
                    reaction: body
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then (dbThoughtDate => {
            if(!dbUserDate) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtDate);
        })
        .catch(err => res.json(err));
    },
    
    // update (PUT) thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {
            _id: params.id 
            },
            body,
            { 
                new: true 
            })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE to pull and remove a reaction byy the reaction's id value
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $pull: {
                    reaction: {
                        reactionId: params.reactionId
                    }
                }
            },
            {
                new: true
            }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'Not thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deleteThought => {
            if(!deleteThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thought: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserDate => {
            if(!dbUserDate) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserDate);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;