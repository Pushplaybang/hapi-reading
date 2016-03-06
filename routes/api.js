/* Import our Handlers */
const Handlers = require('./handlers/api');

/* Define an empty routes obj*/
const routes = {};


// Api Home
routes.home = {
  method: 'GET',
  path: '/api/v1',
  handler: Handlers.home,
};

/*
  Route With Params:
   - Note that there are more advanced methods for managing params, and that hapi
   automatically selects the most specific route before the least, handles wildcard params,
   you can specify the number of segments, as well as make params optional etc.
*/

// eg wildcard route
routes.wildCard = {
  method: 'GET',
  path: '/api/v1/{name}',
  handler: Handlers.wildCard,
};

/* Taking control of the response object */
routes.controlled = {
  method: 'GET',
  path: '/api/v1/controled-response',
  handler: Handlers.controlled,
};


/* Export an array of routes that can be used in server.js */
module.exports = [
  routes.home,
  routes.wildCard,
  routes.controlled,
];
