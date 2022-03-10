// import dependencies from mongo
const { Schema, model, Types } = require('mongoose');

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
            get: (createAtVal) => moment(createAtVal).format('MM DD, YYYY [at] hh:mm a')
        }

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
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (createAtVal) => moment(createAtVal).format('MM DD, YYYY [at] hh:mm a')
        },
        // username of the one who created the thought
        username: {
            type: String,
            required: true
        },
        // replies
        reactions: [ReactionSchema]
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});



const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;