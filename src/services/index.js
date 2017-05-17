'use strict';
const googlesearche = require('./googlesearche');
const poi = require('./poi');
const googleplaceadd = require('./googleplaceadd');
const googleplace = require('./googleplace');
const wifi = require('./wifi');
const place = require('./place');
const type = require('./type');
const offer = require('./offer');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(offer);
  app.configure(type);
  app.configure(place);
  app.configure(wifi);
  app.configure(googleplace);
  app.configure(googleplaceadd);
  app.configure(poi);
  app.configure(googlesearche);
};
