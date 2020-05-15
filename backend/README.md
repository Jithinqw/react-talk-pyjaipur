# Todo Backend

Todo backend written in Nodejs

## Running

Please make sure that you install [Nodejs](https://nodejs.org) and [MongoDB](https://www.mongodb.com/).
All configurations are written in the `/Config` folder. Please make changes to the folder if needed.

- If MongoDb is not running as a deamon. Please run MongoDB using `mongod --dbPath="<----your mongo db/data path----->"`
- Install all dependencies using `npm install` or `npm i`.
- Start your backend using `npm start` or `node server.js`.
- Application Logs are collected using `winston` in a `.logs` folder.

## Tools used

- Nodejs v12.0.0
- ExpressJs - Backend Framework
- Winston + Morgan - Log collection
- Mongoose - Database and ORM
- Cerberus - Validations and User input handling.
- Bcrypt - Password Encryption and validation.
- Helmet - Basic protection agnist hacks.
- Compression - Gzip compression for Nodejs.