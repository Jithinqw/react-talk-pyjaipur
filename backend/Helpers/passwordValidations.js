/**
 * @fileoverview Password validations
 */

const bcrypt = require('bcrypt'),
      saltRounds = 10;

/**
 * @exports isPasswordValid
 * @desc Checks if the password is in a particular format
 * @returns {bool}
 */
exports.isPasswordValid = password => {
    var rule = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return rule.test(password);
};

/**
 * @exports isPasswordEqual
 * @desc Checks if the password and confirm passwords are equal
 * @returns {bool}
 */
exports.isPasswordEqual = (password, confirmPassword) => {
    if (
        new String(password).valueOf() === new String(confirmPassword).valueOf()
    ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @exports generateRandomStrongPassword
 * @desc Generates Random passwords for user who forgets password
 * @returns {String}
 */
exports.generateRandomStrongPassword = () => {
    return Math.random()
        .toString(36)
        .slice(-8);
};

/**
 * @exports generatePasswordHash
 * @desc Generates password hash using bcrypt
 * @returns {String}
 */
exports.generatePasswordHash = password => {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

/**
 * @exports comparePasswordHash
 * @desc Compares Password hashes using bcrypt
 * @returns {bool}
 */
exports.comparePassword = (password, passwordHash) => {
    var isEqual = bcrypt.compareSync(password, passwordHash);
    return isEqual;
};