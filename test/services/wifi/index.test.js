'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('wifi service', function() {
  it('registered the wifis service', () => {
    assert.ok(app.service('wifis'));
  });
});
