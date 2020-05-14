/**
 * @fileoverview Mongoose models for storing blacklisted JWT tokens
 */

var mongoose = require('mongoose')

var blacklistedJWTSchema = new mongoose.Schema({
    invalidToken: {
        type: String,
        required: true,
        unique: true,
    },
    disqualifiedTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})

module.exports = mongoose.model('blacklistedJWT', blacklistedJWTSchema)
