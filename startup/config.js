const config = require('config');

module.exports = function () {
if(!config.get("jwtPrivateKey")){
    console.error('Please provide a jwt private key')
  process.exit(1);
  }
}