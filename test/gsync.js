'use strict';

/*

Links
  Reports
    Statistics
      https://play.google.com/apps/publish/?dev_acc=03735333337010228305#BulkExportPlace:bet=STATS

*/

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var gsync = require('../gsync');
var privateOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '/private.json')));

describe('module gsync', function() {
  describe('execute', function() {
    it('should not throw an error AND sync as expected (manual verification)', function(done) {
      console.log('setting 3min timeout for this test');
      this.timeout(180 * 1000);
      return gsync.execute(_.assign({}, privateOptions, {
        keyFilename: __dirname + '/key.json',
        prefix: 'stats/installs/installs_',
        nameSelector: function(name) {
          return name.indexOf('2016') > -1;
        },
        outputDirectory: __dirname + '/sync-bucket/' + privateOptions.bucket,
      }))
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });
  });
});