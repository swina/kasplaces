'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('googleplace service', function() {
  it('registered the googleplaces service', () => {
    assert.ok(app.service('googleplaces'));
  });
});
