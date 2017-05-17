'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('offer service', function() {
  it('registered the offers service', () => {
    assert.ok(app.service('offers'));
  });
});
