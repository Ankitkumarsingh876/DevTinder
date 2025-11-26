const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }
}

const validateEditProfileData = (req) => {
    const allowedEditField = ["firstName","email","lastName", "age", "Gender", "about", "photoURL","skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditField.includes(field)
    );

    return isEditAllowed;

}

module.exports = {validateSignupData,validateEditProfileData};