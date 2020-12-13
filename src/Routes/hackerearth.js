'use strict';

const hackerEarth       = require('hackerearth-node');
const express           = require('express');
const router            = express.Router();
const path              = require('../path');

const token = '37d422c62f85e7d2bc1100c3e2427bb630ca7bfc';
const hackerEarthApp = new hackerEarth(token);

router.post(path + '/run', (req, res, next) => {
  hackerEarthApp.run({
    time_limit: 1,
    source: req.body.source,
    language: 'C++',
    input: req.body.input,
  }).then(json_result => {
    const object_resuld = JSON.parse(json_result);
    if (object_resuld.compile_status !== 'OK') {
      res.send("ERR");
    } else {
      res.send(object_resuld.run_status.output);
    }
  }).catch(err => {
    res.send(err);
  });
});

module.exports = router;