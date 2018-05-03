// require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)

var Twitter = require("twitter")
var client = new Twitter(keys.twitter)

var omdb = require("omdb")



// OMDB request
var request = require("request");

var nodeArgs = process.argv 

var movieName = ""

for(var i=2;i<nodeArgs.length;i++) {
    if(i>2 && i<nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i]
} else {
    movieName += nodeArgs[i]
    }
        }

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl)

request(queryUrl, function(error, response, body){
    if(error) {
        return console.log(error)
    }

    if(!error && response.statusCode === 200) {
        console.log("Title" + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Actors" + JSON.parse(body).Actors);
        
    }
}
)