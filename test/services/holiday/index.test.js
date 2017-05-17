'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('holiday service', function() {
  it('registered the holidays service', () => {
    assert.ok(app.service('holidays'));
  });
});
