'use strict'
const crypto = require('crypto');

module.exports = function(pass, secret){
  const hash = crypto.createHmac('sha256', secret)
                     .update(pass)
                     .digest('hex');
  return hash;
}
