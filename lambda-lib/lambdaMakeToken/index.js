/**
 * index
 * Created by dcorns on 4/30/17
 * Copyright © 2017 Dale Corns
 * MIT Licensed
 */
'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const https = require('https');
exports.handler = (event, context, cb) => {
  const guid = event.guid;
  if(admin.apps.length === 0){ // <---Important!!! In lambda, it will cause double initialization and the API Gateway will need to execute twice for a successful result.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DB
    });
  }
  admin.auth().createCustomToken(guid)
    .then((token) => {
      cb(null, token);
    })
    .catch((err) => {
      cb(err);
    });
};
