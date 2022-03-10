const router = require('express').Router();
const { 
    addThought,
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thought
router.route('/')
.post(createThought)
.get(getAllThought);

// /api/thought/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

// /api/thoughts/userId
router.route('/:userId')
.post(createThought);

// /api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);

// /api/userId/thoughtId/reactionId
router.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;