/**
 * @fileoverview This exports can generate Ids for you
 */

var uuid = require('uuid/v4')

/**
 * @exports generateId
 * @desc This function will generate a crypographically
 * strong user-id for a user
 * @return {String}
 */
exports.generateUserId = () => {
    return uuid()
}

exports.generateNoteID = () => {
    return uuid()
}