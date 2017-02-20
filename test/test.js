var assert = require('assert');
var WebglApp = require('../src/app');

describe('WebglApp', function() {
  describe('#run()', function() {
    it('should be constructable', function() {
      assert.ok(new WebglApp());
    });

    it('should be able to run', function() {
      assert.doesNotThrow(() => {
        const app = new WebglApp();
        app.run();
      });
    });
  });
});