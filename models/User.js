// import the dependencies from mongoose
const { Schema, model } = require('mongoose');

// create schema
const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match a valid email address
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address']
            
        },
        // reference thought model
        thought: [
            {
                // tell mongoose to expect an ObjectId
                type: Schema.Types.ObjectId,
                // tell it the data comes from the thought model
                ref: 'Thought'
            }
        ],
        // friends : array of _id values referencing the User model (self-reference)
        friend: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friend.length
});

const User = model('User', UserSchema);


module.exports = User; 