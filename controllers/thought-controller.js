const { Thought, User } = require('../models');

const thoughtController = {
    // add thought to a user
    addThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thought: _id } },
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
}



module.exports = thoughtController;