/*liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`*/



//require NPM and twitter API keys & token

var twitter = require("twitter");
var keys = require("./keys.js");
var client = new twitter(keys.twitterKeys);

//require NPM for 'fs' and 'request'
var fs = require("fs");
var request = require("request");

//require Spotify keys (ID & Secret)
var spotifyKeys = require("node-spotify-api");
var spotify = new spotifyKeys(keys.spotifyKeys);

//require OMDB NPM
var omdb = require("omdb");

//stores a read-only copy of the 'command' & 'userChoice' values
var command = process.argv[2];
var userChoice = process.argv[3];

//for loop to amalgamate 'userChoice' value
for(let i = 4; i < process.argv.length; i++){
	    userChoice += '+' + process.argv[i];
}

//switch statements that execute associated statements
function switchCommand(){
	switch(command){
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThisSong(userChoice);
			break;
		case "movie-this":
			movieThis(userChoice);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("Yo! Enter a valid command.");
			console.log('"my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"');
			break;
	}
}


//'myTweets' function that fetchs 20 tweets and console.logs to the CLI
function myTweets(){
	console.log('foo');
	var params = {
		screen_name: "Stackscoop",
		count: 20
	};
	client.get("statuses/user_timeline", params, function(error, tweets, response){
		console.log('bar');
		if(!error){
			if (tweets.length == 0) {
				console.log("((( No tweets, fool! )))");	
			}
			for(var i = 0; i < tweets.length; i++){
				console.log("-----------------------");
				console.log("Tweet: " + tweets[i].text);
				console.log("Created: " + tweets[i].created_at);
			}
		}else{
			console.log(error);
		}
	});
}

//'spotifyThisSong' function returns song data for "The Sign" by Ace of Base if value is empty or undefined
function spotifyThisSong(song) {
	if(!song){
		song = "The Sign Ace of Base";
	}

	spotify.search({type: "track", query: song}, function(error, data){
		if(error){
			console.log(error);
			return;
		}
		//if no error console.log song info
		console.log("Spotify Song Information");
		console.log("------------------");
		console.log("Artist/Band: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Preview: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("------------------");

	});
}

//'movieThis' function which defaults to "Mr. Nobody" if value is empty or unefined
function movieThis(movie){
	if(!movie){
		movie = "Mr. Nobody";
	}
	//queryURL
	var query = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey="+keys.omdbKey;
	request(query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	console.log("Movie Information");
        	console.log("------------------");
        	console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Release Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
        } else{
        	console.log(error);
        }
    });
}

//'doWhatItSays' function, well it speaks for itself
function doWhatItSays(){
	//use 'fs' to read from random.txt file (utf8 to read)
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		}
		//seperate by "," to get song name
		var randomSong = data.split(",");
		//index[1] , song value
		spotifyThisSong(randomSong[1]);
	});
}


//primary function which iniates all other functions
switchCommand();




