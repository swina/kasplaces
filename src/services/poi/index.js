'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'pois.db'),
    autoload: true,
    timestampData: true,
    ensureIndex: { fieldName: 'place_id' , unique: true }
  });

  let options = {
    Model: db,
    paginate: {
      default: 100,
      max: 100
    }


  };

  // Initialize our service with any options it requires
  app.use('/pois', service(options));

  // Get our initialize service to that we can bind hooks
  const poiService = app.service('/pois');

  // Set up our before hooks
  poiService.before(hooks.before);

  // Set up our after hooks
  poiService.after(hooks.after);
};
