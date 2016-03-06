'use strict';
const SanitizeHtml = require('sanitize-html');
const countSyllables = require('syllable');

const TextAnlysis = {};


/* Return Text Stats */
TextAnlysis.stats= (text) => {
  let content = TextAnlysis.cleanText(text);
  let data = {
    sentence: TextAnlysis.sentenceCount(content),
    word: TextAnlysis.wordCount(content),
    syllable: TextAnlysis.syllableCount(content),
    character: TextAnlysis.charCount(content),
    letter: TextAnlysis.charCount(content), // needed for coleman-liau
    averageCharsPerWord: TextAnlysis.averageCharsPerWord(content),
  };
  return data;
};

/* Clean The text input */
TextAnlysis.cleanText = (text) => {
  return SanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: [],
    nonTextTags: [ 'style', 'script', 'textarea', 'noscript' ]
  });
};

/* Create an array of sentances */
TextAnlysis.findSentences = (text) => {
  let sentence, sentences, result, _i, _len;
  sentences = text.split(".");
  result = [];
  for (_i = 0, _len = sentences.length; _i < _len; _i++) {
    sentence = sentences[_i];
    if (sentence.trim() !== "") {
      result.push(sentence);
    }
  }
  return result;
};

/* Return the sentance count */
TextAnlysis.sentenceCount = (text) => {
  return TextAnlysis.findSentences(text).length;
};

/* Create an array fo words */
TextAnlysis.findWords = (text) => {
  return text.match(/[A-z\u00E0-\u00FC]+/g);
};

/* Return the word count */
TextAnlysis.wordCount = (text) => {
  return TextAnlysis.findWords(text).length;
};

/* Count Syllables */
TextAnlysis.syllableCount = (text) => {
  return countSyllables(text);
};

/* Count the number of characters in the text */
TextAnlysis.charCount = (text) => {
  let word, tot, _i, _len;
  let content = TextAnlysis.findWords(text);
  tot = 0;
  for (_i = 0, _len = content.length; _i < _len; _i++) {
    word = content[_i];
    if (word !== null) {
      tot += word.length;
    }
  }
  return tot;
};

/* Average characters per word */
TextAnlysis.averageCharsPerWord = (text) => {
  let result = TextAnlysis.charCount(text) / TextAnlysis.wordCount(text);
  return result.toFixed(1);
};

module.exports = TextAnlysis;