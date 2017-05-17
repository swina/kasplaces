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

  find(qry,params) {
    return new Promise((resolve, reject) => {

      var req = https.get(options.host + 'key=' + options.key + '&location=' + options.location + '&radius=' + options.radius + '&sensor=' + options.sensor + '&type=' + qry.query.type , function(res) {
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

  get(id, params) {
    console.log ( params )
    var pagetoken = ''
    if ( params.token ){
      pagetoken = params.token
    }
    var url = options.host + 'key=' + options.key + '&location=' + options.location + '&radius=' + options.radius + '&sensor=' + options.sensor + '&type=' + id + '&pagetoken=' + pagetoken
    if ( id == 'photo' ){
      url = options.host_photo + 'reference=' + params.photo + '&key=' + options.key
    }
    if ( id == 'details' ){
      url = options.host_detail + 'placeid=' + params.query.placeid + '&key=' + options.key
    }
    if ( id == 'search' ){
      var url = options.host + 'key=' + options.key + '&location=' + options.location + '&radius=' + options.radius + '&sensor=' + options.sensor + '&keyword=' + params.query.keyword + '&pagetoken=' + pagetoken 
    }
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
        if ( id != 'photo' ){
          var places = JSON.parse(body);
          var locations = places.results;
          resolve(places);
        } else {
          var place_photo = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=240&photoreference=' + params.query.photo +'&key=' + options.key
          resolve ( place_photo )
        }
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
  app.use('/googleplaces', new Service());

  // Get our initialize service to that we can bind hooks
  const googleplaceService = app.service('/googleplaces');

  // Set up our before hooks
  googleplaceService.before(hooks.before);

  // Set up our after hooks
  googleplaceService.after(hooks.after);
};

module.exports.Service = Service;
