'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('googlesearche service', function() {
  it('registered the googlesearches service', () => {
    assert.ok(app.service('googlesearches'));
  });
});
