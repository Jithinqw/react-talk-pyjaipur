/**
* @fileoverview JWT secrets 
*/
const secret = "winter is coming";
const signOptions = {
  issuer: "todo",
  subject: "JWT",
  audience: "todo-users",
  expiresIn: "12h",
  algorithm: "RS256"
};

var verifyOptions = {
  issuer: "todo",
  subject: "JWT",
  audience: "todo-users",
  expiresIn: "12h",
  algorithm: ["RS256"]
 };

module.exports = {
  secret: secret,
  signOptions: signOptions,
  verifyOptions: verifyOptions
}