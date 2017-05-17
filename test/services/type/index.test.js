'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('type service', function() {
  it('registered the types service', () => {
    assert.ok(app.service('types'));
  });
});
