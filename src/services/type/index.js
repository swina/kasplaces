'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'types.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/types', service(options));

  // Get our initialize service to that we can bind hooks
  const typeService = app.service('/types');

  // Set up our before hooks
  typeService.before(hooks.before);

  // Set up our after hooks
  typeService.after(hooks.after);
};
