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
            
        },
        // reference thought model
        
    }
)