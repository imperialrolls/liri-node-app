// require necessary node modules
const fs = require("fs");

var twitter = require("twitter");
var twitterKeys = require("./keys.js").twitterKeys
var twitterObj = new twitter(twitterKeys);

var request = require("request");

var spotify = require("node-spotify-api");


console.log('Would you like to play a game?');


