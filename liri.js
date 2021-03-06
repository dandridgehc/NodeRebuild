require("dotenv").config()

var keys = require("./keys.js")
var request = require("request");

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)

var Twitter = require("twitter")
var client = new Twitter(keys.twitter)

var omdb = require("omdb")

var fs = require("fs");


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
            for(var i=0;i<19;i++) {
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
            if(programAction === undefined) {
              var searchTerm = "The Sign Ace of Base"
            }
    
        spotify.search({ type: 'track', query: programAction }, function(err, data) {
        if (err) {
          return console.log('TYPE IN A SONG FOO' + err);
        }
        //Artist(s)
        console.log("")
        console.log("Artist: ", data.tracks.items[0].album.artists[0].name)
        // The song's name
        console.log("Song Name: ", data.tracks.items[0].album.name)
        // A preview link of the song from Spotify
        console.log("Preview Link: ", data.tracks.items[0].album.external_urls.spotify)
        // The album that the song is from
        console.log("Album: ",data.tracks.items[0].album.name); 


      //starter object
      //console.log(data.tracks.items[0]); 
      });

}

function movieThis(programAction) {
    console.log("running movie program")
        if(programAction != undefined) {
            //console.log(programAction)
            var movieName = programAction
        } else {
            var nodeArgs = process.argv

            var movieName = ""

            for(var i=3;i<nodeArgs.length;i++) {  
                if(i>3 && i<nodeArgs.length) {
                    movieName = movieName + "+" + nodeArgs[i]
                } else {
                    movieName += nodeArgs[i]
                }
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
     
        //console.log(response)
        
            }
        }
    )
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

     
			//Creates array with data.
			var randomArray = data.split(",");

			// Sets action to first item in array.
			var action = randomArray[0]
            //var aLength = action.length
           // action = action.slice()
            //console.log("action", action)
            //console.log(typeof(action))
			// Sets optional third argument to second item in array.
            var argument = randomArray[1];
            
            if(action == "movie-this"){
                 movieThis(argument)
                 console.log(action.length)
            }

           

            // if(action === "my-tweets") {
            //     myTweets()
            // } else if(action === "spotify-this-song") {
            //     spotifyThisSong()
            // } else if(action === "movie-this") {
            //     console.log("movie this happened")
            //     movieThis(argument)
            // } else {
            //     console.log("nothing happened")
            // }

			
		}
	});
}


