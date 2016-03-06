'use strict'
/* Dependancies */
const SanitizeHtml = require('sanitize-html');
const ReadingTime = require('reading-time');
const FleschKincaid = require('flesch-kincaid');
const ColemanLiau = require('coleman-liau');
const AutomatedReadability = require('automated-readability');
const Sentiment = require('sentiment');

var Readability = {};

Readability.stats = (stats, text) => {
  if (!stats || !text)
    return false;

  let statistics = stats;
  let content = Readability.cleanText(text);
  let data = {
    readingTime: ReadingTime(content), // like mediums 'reading time'
    sentiment: Sentiment(content),
    fleschKincaid: FleschKincaid(stats).toFixed(2), // grade level
    colemanLiau: ColemanLiau(stats).toFixed(2), // returns grade level
    automatedReadability: AutomatedReadability(stats).toFixed(2),
  };

  let averageGradeLevel = Readability.averageGrade(data);
  data.averageGradeLevel = averageGradeLevel;

  data.sentiment.positiveCount = data.sentiment.positive.length;
  data.sentiment.negativeCount = data.sentiment.negative.length;

  return data;
};

/* Clean The text input */
Readability.cleanText = (text) => {
  return SanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: [],
    nonTextTags: [ 'style', 'script', 'textarea', 'noscript' ]
  });
};

Readability.averageGrade = (data) => {
  return Math.round((
      parseInt(data.fleschKincaid) +
      parseInt(data.colemanLiau) +
      parseInt(data.automatedReadability)
    ) / 3
  );
};


module.exports = Readability;