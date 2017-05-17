'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'googleplaceadds.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 100,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/googleplaceadds', service(options));

  // Get our initialize service to that we can bind hooks
  const googleplaceaddService = app.service('/googleplaceadds');

  // Set up our before hooks
  googleplaceaddService.before(hooks.before);

  // Set up our after hooks
  googleplaceaddService.after(hooks.after);
};
