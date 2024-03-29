const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if(!token) return res.status(401).send("Acces denies access, no token");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
    req.user = decoded
    next();
  }
  catch {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;