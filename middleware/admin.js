const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Send a valid access token")
next()
}

module.exports = auth; 