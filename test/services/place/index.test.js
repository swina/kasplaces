'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('place service', function() {
  it('registered the places service', () => {
    assert.ok(app.service('places'));
  });
});
