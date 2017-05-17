'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('googleplaceadd service', function() {
  it('registered the googleplaceadds service', () => {
    assert.ok(app.service('googleplaceadds'));
  });
});
