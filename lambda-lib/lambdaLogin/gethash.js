/**
 * gethash
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const crypto = require('crypto');
module.exports = function getHash(email, secret){
  const cipher = crypto.createCipher('aes-256-cbc-hmac-sha256', secret);
  let hash = cipher.update(email,'utf8','hex');
  hash += cipher.final('hex');
  return hash;
};