// import dependencies from mongo
const { Schema, model } = require('mongoose');

const dateFormat = require('../')

const ReactionSchema = new Schema (
    {
        
    }
)


// create schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            // must be between 1 & 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: createAtVal => dateFormat(createAtVal)
        },
        // username of the one who created the thought
        username: {
            type: String,
            required: true
        },
        // replies
        reactions: {
            // Array of nested documents created with the reactionSchema
        }
    }

    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;