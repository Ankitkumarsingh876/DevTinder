const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        minLength: 4,
        maxLength: 15,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
    },
    Gender: {
        type: String,
        validate(value){
        if(!["male", "female", "other"].includes(value)) {
            throw new Error("Gender data not valid");
        }

        },
    },
    photoURL: {
        type: String,
        default: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
    },
    about: {
        type: String,
        default: "this is a default about user!"
    },
    skills: {
        type: [String],
    },

},{
    timestamps: true,
})

module.exports = mongoose.model("User" , userSchema);