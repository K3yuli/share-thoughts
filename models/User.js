// import the dependencies from mongoose
const { Schema, model } = require('mongoose');
// create model
const User = model('User', UserSchema);

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
            
        },
        // reference thought model
        thoughts: [

        ]
        


        // friends : array of _id values referencing the User model (self-reference)

    }
)

// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const User = model('User', UserSchema);
module.exports = { User }; 