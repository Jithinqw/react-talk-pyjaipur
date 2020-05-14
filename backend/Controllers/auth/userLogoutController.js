var blacklistedJWTModel = require('../../Models/blacklistedTokenModel'),
    JWTCertifier = require('../../Helpers/JWTCertifier');

/**
 * @exports logout
 * @desc This can logout a user and
 * add the jwt into the blacklisted collection
 */
exports.logout = (req, res) => {
    const token = req.headers['x-api-key']
    if (!token) {
        res.status(403).json('API key not provided');
    } else if (JWTCertifier.verifyToken(token) === false) {
        res.status(403).json('Token not valid');
    } else {
        blacklistedJWTModel.create(
            {
                invalidToken: token,
            },
            (err, expire) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json('Successfully logged out.');
                }
            }
        )
    }
}