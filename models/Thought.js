// import dependencies from mongo
const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../')

const ReactionSchema = new Schema (
    {
        reactionId: {
            // use mongoose objectid data type
            type: Schema.Types.ObjectId,
            // default value is set to a new ObjectId
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // 280 character maximum
            maxlength: 280

        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            // set default to the current timestamp
            default: Date.now,
            // use getter method to format the timestamp on query
            get: createAtVal => dateFormat(createAtVal)
        },

    },
    {
        toJSON: {
            getters: true
        },
    }
);


// create schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            // must be between 1 & 280 characters
            maxlength: 280
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;