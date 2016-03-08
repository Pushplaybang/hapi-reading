/* Get Hapi and other dependancies */
const Hapi = require('hapi');

/* Hapi Plugins */
const Inert = require('inert');            // easy static file hanling,
const Good = require('good');              // logging package
const Blipp = require('blipp');            // prints routes on startup
const Boom = require('boom');              // http friendly errors
const Vision = require('vision');          // Hapi templates and views
const HandleBars = require('handlebars');  // handlebars templating

/* Import Our Modules */
const PageRoutes = require('./routes/pages');
const ApiRoutes = require('./routes/api');


/* Init a server & set options */
const server = new Hapi.Server({
  connections: {
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
  },
});


/* Set the connection details */
server.connection({
  host: 'localhost',
  port: 8000,
});


/* Setup options for 'Good' Logging */
const goodOptions = {
  reporters: [{
    reporter: require('good-console'),
    events: { log: '*', response: '*' },
  }],
};

/* Register server plugins and define routes */
server.register([
  Inert,
  Blipp,
  Vision,
  {
    register: Good,
    options: goodOptions,
  }], (err) => {
  // exit early on err
  if (err) throw err;

  // setup views using vision
  server.views({
    engines: { html: HandleBars },
    relativeTo: __dirname,
    path: 'views',
    partialsPath: 'views/partials',
  });

  /* Request Response Life Cycle Events */
  server.ext('onPreResponse', (request, reply) => {
    const resp = request.response;
    if (!resp.isBoom) return reply.continue();

    return reply.view('error', resp.output.payload)
      .code(resp.output.statusCode);
  });

  /* Setup API Routes */
  server.route(ApiRoutes);

  /* Register our assets and page routes */
  server.route(PageRoutes);

  /* Start the server */
  server.start(() => {});
});



