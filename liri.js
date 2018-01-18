// node array set-up

var liri = process.argv;

// require necessary node modules

const fs = require("fs");

var request = require("request");

// requiring twitter.js
var twitter = require("./twitter");

if (liri[2] === "my-tweets") {
	twitter.myTweets();
}



// var spotify = require("node-spotify-api");







