var Twitter = require("twitter");
var twitterKeys = require("./keys.js").twitterKeys;
var twitterObj = new Twitter(twitterKeys);

const fs = require("fs");

var writeToLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}

module.exports.myTweets = function() {

var params = {screen_name: 'CoffeeTeaMe' , count: 10 };
twitterObj.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      writeToLog(data);
    }
  });
};




// client.get(path, params, callback);