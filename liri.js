var keyShow = require("./keys.js");

var twitterConKey = keyShow.twitterKeys.consumer_key;
var twitterConSecret = keyShow.twitterKeys.consumer_secret;
var twitterAccessTokenKey = keyShow.twitterKeys.access_token_key;
var twitterAccessTokenSec = keyShow.twitterKeys.access_token_secret;

var input = process.argv[2];
var secInput = process.argv[3];

var movieName;
var songTitle;

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");


	if (input === 'my-tweets')

		{
			twitter();
		}

	else if (input === 'spotify-this-song')

		{
				if (secInput === undefined) 
				{
					songTitle = "The Sign";
				}
				else 
				{
					songTitle = joinStrings(songTitle);
				}
			console.log(songTitle);
			spotifyy(songTitle);
		}

	else if (input === 'movie-this')

		{
				if (secInput === undefined) 
				{
					movieName = "Mr. Nobody";
				}
				else 
				{
					movieName = joinStrings(movieName);
				}
			console.log(movieName);
			movie(movieName);
		}

	else if (input === 'do-what-it-says')

		{
			dowhatitsays();
		}



function joinStrings(x)
		{
			{ 	x = [];
				for ( var i=3; i< process.argv.length; i++)
					{
						x.push(process.argv[i]);
					}
				x = x.join(" ");
				return x;
			}
		}


function twitter() 
	{
		  var client = new Twitter({
		  consumer_key: twitterConKey,
		  consumer_secret: twitterConSecret,
		  access_token_key: twitterAccessTokenKey,
		  access_token_secret: twitterAccessTokenSec
		});

		var params = {screen_name: '@realDonaldTrump'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) 
		  	{
		  	for (var k =0; k<20; k++)

			  	{
			  		console.log("*******************************************************")
			  		console.log(" Tweet: " +tweets[k].text);
			  		console.log("                                                       ")
		    		console.log(" Tweet created: " +tweets[k].created_at);
		    		console.log("*******************************************************")
		    		console.log("                                                        ")
			  	}
		  	}
		});
	}


function spotifyy(songName) 

	{		console.log("i'm at spotify function");
			spotify.search({ type: 'track', query: songName}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    console.log(" Artist : " + data.tracks.items[0].artists[0].name); 
		    console.log(" Song's name : " + data.tracks.items[0].name); 
		    console.log(" Preview link : " + data.tracks.items[0].preview_url); 		  
		    console.log(" Album : " + data.tracks.items[0].album.name); 
 
		});
	}


function movie(mName)

	{
		var queryUrl = "http://www.omdbapi.com/?t=" + mName + "&y=&plot=short&r=json" +"&tomatoes=true" ;
		console.log(queryUrl);

		request(queryUrl,function(error,response,body) {

		if (!error && response.statusCode ===200)

			{
				//console.log(JSON.parse(body));
				console.log("Title of the movie: "+ JSON.parse(body).Title);
				console.log("The movie's release Year is : "+ JSON.parse(body).Year);
				console.log("The movie's IMDB rating is : "+ JSON.parse(body).imdbRating);
				console.log("The movie was produced in : "+ JSON.parse(body).Country);
				console.log("The language of the movie is : "+ JSON.parse(body).Language);
				console.log("The plot of the movie is : "+ JSON.parse(body).Plot);
				console.log("Actors of the movie are : "+ JSON.parse(body).Actors);
				console.log("Rotten tomatoes Rating : "+ JSON.parse(body).tomatoRating);
				console.log("Rotten tomatoes URL: "+ JSON.parse(body).tomatoURL);

			}
		});
	}


function dowhatitsays()

	{
		var fs = require("fs");
		fs.readFile("random.txt","utf8", function(error,data)
		{
				if (error) 
				{
					return console.log("err");
				}

			var datainit = data.split(",")[0]; // 1st item, either movie this or spotify this
			var datasecond = data.split(",")[1]; // second item after the comma, movie or song name

			console.log(datainit);
			console.log(datasecond);
			console.log(data);

			if (datainit === "spotify-this-song")
			{
				spotifyy(datasecond);
			}
			 if (datainit === "my-tweets")
			{
				twitter();
			}

			else if (datainit === "movie-this")
			{
				movie(datasecond);
			}
		})

	}


