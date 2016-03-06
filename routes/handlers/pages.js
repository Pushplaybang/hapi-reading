'use strict';

/* Require Dependancies */
const Path = require('path'); // path util
const Joi = require('joi'); // request validation
const Boom = require('boom'); // error handling
const URL = require('url');
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const validUrl = require('valid-url');

/* Text analysis */
const TextStats = require('../../text-analysis/text-analysis');
const Readability = require('../../text-analysis/readability');

/* Define an empty object to attach our handlers too */
const handlers = {};

/*
  NB: The inert module is in play here
*/

/* Serve Static assets from the public directory */
handlers.assets = {
  directory: {
    path: Path.join(__dirname, '../../public'),
  },
};

/* Home Page */
handlers.home = (request, reply) => {
  return reply.view('home');
};

/* Results Page */
handlers.about = (request, reply) => {
  return reply.view('about');
};

/* Main App Page */
handlers.app = (request, reply) => {
  return reply.view('app');
};

/* Results Page */
handlers.results = (request, reply) => {
  /* validate the url */
  if (!validUrl.isUri(request.payload.url))
    return reply.view('badInput');

  /* Fetch the url and then analyze it */
  Rp({
      uri: request.payload.url,
      transform: (body) => {
        return Cheerio.load(body);
      }
  }).then(($) => {
      let data = {};

      // let content = $('.section-inner').text(); // medium specific selector
      let content = $('body');

      data.url = URL.parse(request.payload.url);
      data.counts = TextStats.stats(content);
      data.analysis = Readability.stats(data.counts, content);

      console.log(data);

      return reply.view('results', data);
    }).catch((err) => {
      console.log(err);
    });

};

/* Export Our handlers */
module.exports = handlers;
