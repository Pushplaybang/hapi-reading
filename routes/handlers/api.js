'use strict';

/* Require Dependancies */
const Path = require('path');
const Joi = require('joi');

/* Define an empty object to attach our handlers too */
var handlers = {};

/* Simple response */
handlers.home = (request, reply) => {
  reply('Hello Hapi')
    .type('text/json');
};

/* use a param in the reply */
handlers.wildCard = (request, reply) => {
  reply(`hello ${encodeURIComponent(request.params.name)}`)
    .type('text/json');
};

/* control more reply options */
handlers.controlled = (request, reply) => {
  reply('hello World, don\'t panic, its under control')
    .code(418)
    .type('text/json')
    .header('hello', 'world')
    .state('hello', 'world');
};


/* Export Our handlers */
module.exports = handlers;
