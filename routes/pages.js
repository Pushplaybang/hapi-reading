/* Import our Handlers */
const Handlers = require('./handlers/pages');

/* Define an empty routes obj*/
const routes = {};

/* Serve Static Assets */
routes.assets = {
  method: 'GET',
  path: '/public/{file*}',
  handler: Handlers.assets,
};

/*  Home Page */
routes.home = {
  method: 'GET',
  path: '/',
  handler: Handlers.home,
};

/*  About Page */
routes.about = {
  method: 'GET',
  path: '/about',
  handler: Handlers.about,
};

/* Main App Page */
routes.app = {
  method: 'GET',
  path: '/app',
  handler: Handlers.app
};

/* Results Page */
routes.results = {
  method: 'POST',
  path: '/results',
  handler: Handlers.results
}

/* Export an array of routes that can be used in server.js */
module.exports = [
  routes.assets,
  routes.home,
  routes.about,
  routes.app,
  routes.results,
];
