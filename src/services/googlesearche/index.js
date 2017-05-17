'use strict';

const hooks = require('./hooks');

const https = require('https');

const options = {
  host: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  host_photo: 'https://maps.googleapis.com/maps/api/place/photo?',
  host_detail: 'https://maps.googleapis.com/maps/api/place/details/json?',
  key : 'AIzaSyBgOK3WAJmpzAWLcYMAco0qeAMq9z9sDUI',
  location: '36.199913,29.63955',
  radius: 10000,
  sensor: false
}

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve([]);
  }

  get(id, params) {
    console.log ( params )
    var pagetoken = ''
    if ( params.token ){
      pagetoken = params.token
    }
    var url = options.host + 'key=' + options.key + '&location=' + options.location + '&radius=' + options.radius + '&sensor=' + options.sensor + '&type=' + id + '&pagetoken=' + pagetoken
    console.log ( url )
    return new Promise((resolve, reject) => {

      var req = https.get( url , function(res) {

      //var req = https.get(options.host + 'key=' + options.key + '&location=' + options.location + '&radius=' + options.radius + '&sensor=' + options.sensor + '&type=' + id + '&pagetoken=' + pagetoken, function(res) {
      // Buffer the body entirely for processing as a whole.
      var body = '';
      res.on('data', function(chunk) {
        //var body = '';
          // You can process streamed parts here...
        body += chunk;
        //bodyChunks.push(chunk);
      }).on('end', function() {
        var places = JSON.parse(body);
        var locations = places.results;
        resolve(places);
      })
      });

      req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
          resolve ( e )
      });
    });
  }

  create(data, params) {
    if(Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/googlesearches', new Service());

  // Get our initialize service to that we can bind hooks
  const googlesearcheService = app.service('/googlesearches');

  // Set up our before hooks
  googlesearcheService.before(hooks.before);

  // Set up our after hooks
  googlesearcheService.after(hooks.after);
};

module.exports.Service = Service;
