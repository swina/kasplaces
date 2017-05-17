'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('poi service', function() {
  it('registered the pois service', () => {
    assert.ok(app.service('pois'));
  });
});
