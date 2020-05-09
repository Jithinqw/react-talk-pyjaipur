/**
 * @fileoverview This file generates a new JWT for new user, if authenticated
 * and verifies an existing JWT.
 * @author Jithin Zacharia
 */

var fs = require('fs'),
    jwt = require('jsonwebtoken'),
    options = require('../Config/JWTSecretConfig'),
    blacklistedJWTModel = require('../Models/blacklistedTokenModel');
const privateCertFile = fs.readFileSync('./Config/private.key', 'utf-8'),
    publicCertFile = fs.readFileSync('./Config/public.key', 'utf-8')

/**
 * @exports generateJWT
 * @desc generates a JWT token
 * @param {email} email of the user
 * @param {role} role of the current user
 * @returns {String}
 */
exports.generateJWT = (email, userid) => {
    var payload = {
        email: email,
        userid: userid,
    }
    const token = jwt.sign(payload, privateCertFile, options.signOptions);
    return token;
}

/**
 * @exports verifyJWT
 * @desc verifyJWT is a middleware for checking JWT and its validity
 * used in express router.
 * @param {token} JWTToken of the user
 * @returns {String}
 */
exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-api-key'];
    if (!token) {
        return res.status(403).json('No token provided');
    }
    jwt.verify(token, publicCertFile, (err, decoded) => {
        if (err) {
            return res.status(400).json(err);
        } else {
            blacklistedJWTModel.findOne({ where: {token: token }}).then((blackToken)=> {
                if(blackToken) {
                    res.status(401).json("You are using a invalid token");
                } else {
                    next();
                }
            }).catch((err)=>{
                res.status(400).json(err);
            })
        }
    });
}

/**
 * @exports verifyToken
 * @desc A function for verifying tokens. This is not a middleware
 * @param {token} token
 * @returns {bool}
 **/
exports.verifyToken = token => {
    jwt.verify(token, publicCertFile, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    })
}

/**
 * @exports verifyUserRequest
 * @param {*} token
 * @desc returns bool value according to the validaity of the token.
 * @returns {bool}
 */
exports.verifyUserRequest = token => {
    if (!token) {
        return false;
    } else {
        async function tokenResolver(token) {
            try {
                var payload = await verifiedTokenPromise(token);
                return true;
            } catch (e) {
                return false;
            }
        }
        var validToken = tokenResolver(token);
        return validToken;
    }
}

/**
 * @exports tokenNotInBlackList
 * @param {*} token
 * @returns {Object}
 */
exports.tokenNotInBlackList = token => {
    if (!token) {
        return false
    } else {
        async function tokenUser(token) {
            try {
                var userToken = await blacklistedJWT(token)
                return userToken
            } catch (e) {
                return false
            }
        }
        var demoUser = tokenUser(token)
        return demoUser
    }
}

const verifiedTokenPromise = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, publicCertFile, (err, payload) => {
            if (err) {
                reject(err)
            } else {
                resolve(payload)
            }
        })
    })

var blacklistedJWT = token =>
    new Promise((resolve, reject) => {
        blacklistedJWTModel.find(
            { blacklistedJWT: token },
            (error, usedTokens) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(usedTokens)
                }
            }
        )
    })

/**
 * @exports getTokenDecoded
 * @param {*} token
 * @returns {Object}
 */
exports.getTokenDecoded = token => {
    if (!token) {
        return false
    } else {
        async function decodeJWT(token) {
            try {
                var decodedUser = await verifiedTokenPromise(token)
                return decodedUser
            } catch (e) {
                return false
            }
        }
        var decoded = decodeJWT(token)
        return decoded
    }
}

exports.getTokenPayload = req => {
    const token = req.headers['x-api-key']
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicCertFile, (err, decoded) => {
            if (err) {
                reject(err)
                return
            }
            resolve(decoded)
        })
    })
}