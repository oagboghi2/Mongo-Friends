//Create a model
const mongoose = require('mongoose');

//below we design our schema
const FriendSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String, 
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
})

const friendsModel = mongoose.model('Friend', FriendSchema ); 
//This is where we declare this as a model.
//by passing our FriendSchema to this model we declare that it will be a collection.

module.exports = friendsModel;