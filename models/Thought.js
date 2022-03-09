// import dependencies from mongo
const { Schema, model } = require('mongoose');
const Thought = model('thought', ThoughtSchema);

// create schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            // must be between 1 & 280 characters
        },
        createdAt: {
            // date
            // Set default value to the current timestamp
            // Use a getter method to format the timestamp on query
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