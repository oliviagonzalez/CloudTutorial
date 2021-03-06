'use strict';
var Hapi = require('hapi');
var GoodWinston = require('good-winston');
var winston = require('winston');
var server = new Hapi.Server();

server.register({
register: require('good'),
  options: {
    reporters: [
      new GoodWinston({
        ops: '*',
        request: '*',
        response: '*',
        log: '*',
        error: '*'
      }, winston)
    ]
  }
}, function(err) {
  if(err) {
    return server.log(['error'],'good load error: ' + err);
  }
});

if( process.env.PORT ) {
  server.connection({ port: process.env.PORT });
}
else {
  server.connection({ port: 1337 });
}

server.route({
	method : "GET",
	path : '/assets/{param*}',
	handler : {
      directory : {
		path : 'bower_components',
	listing : true
		}
	}

});

server.route({
  method : "GET",
  path : '/{param*}',
  handler : {
    directory : {
      path : 'public',
  listing : true
    }
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});