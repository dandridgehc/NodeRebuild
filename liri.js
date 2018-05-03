require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)

var Twitter = require("twitter")
var client = new Twitter(keys.twitter)

var omdb = require("omdb")


var programToRun = process.argv[2]
var programAction = process.argv[3]

if(programToRun === "my-tweets") {
    myTweets()
} else if(programToRun === "spotify-this-song") {
    spotifyThisSong()
} else if(programToRun === "movie-this") {
    movieThis()
} else if(programToRun === "do-what-it-says") {
    doWhatItSays() 
} else {
    console.log("you need to specify a program")
}

function myTweets() {
    // console.log("running twitter program")
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i=0;i<5;i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text)
                console.log("")
            }    
        }
    });
}


function spotifyThisSong() {
    console.log("running spotify program")
        //after we get this working replace "all the small things" with program action
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        //Artist(s)
        console.log(data.tracks.items[0])
        // The song's name
        console.log(data.tracks.items[0])
        // A preview link of the song from Spotify
        console.log(data.tracks.items[0])
        // The album that the song is from
      console.log(data.tracks.items[0].album.name); 


      //starter object
      //console.log(data.tracks.items[0]); 
      });

}

function movieThis() {
    console.log("running movie program")
}

function doWhatItSays() {
    console.log("do what it says")
}
// OMDB request
// var request = require("request");

// var nodeArgs = process.argv 

// var movieName = ""

// for(var i=2;i<nodeArgs.length;i++) {
//     if(i>2 && i<nodeArgs.length) {
//     movieName = movieName + "+" + nodeArgs[i]
// } else {
//     movieName += nodeArgs[i]
//     }
//         }

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl)

// request(queryUrl, function(error, response, body){
//     if(error) {
//         return console.log(error)
//     }

//     if(!error && response.statusCode === 200) {
//         console.log("Title" + JSON.parse(body).Title);
//         console.log("Release Year: " + JSON.parse(body).Year);
//         console.log("Actors" + JSON.parse(body).Actors);
        
//     }
// }
// )