/**
 * @fileoverview Mongoose model for user
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        min: [3, "Invalid firstname passed"],
        validate: {
            validator: (firstName)=> {
                if(firstName.lenght > 3) {
                    return true;
                } else {
                    return false;
                }
            },
            message: props=> `${props.value} is an invalid firstname`
        }
    },
    lastName: {
        type: String,
        required: true,
        min: [3, "Invalid lastname passed"],
        validate: {
            validator: (lastName)=> {
                if(lastName.lenght > 3) {
                    return true;
                } else {
                    return false;
                }
            },
            message: props=> `${props.value} is an invalid lastName`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password)=>{
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
            },
            message: props => `${props.value} is not a valid password. Please use a valid password.`
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: props => `${props.value} is not a valid email. Please use a valid email.`
        }
    },
    employeeId: {
        type: String,
    },
    profilePic: {
        type: String,
        required: true
    },
    userActive: {
        type: Boolean,
        required: true,
        default: true
     },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)