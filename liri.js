
var command= process.argv[2]; 
var secondCommand= process.argv[3]; 
var Twitter= require('twitter'); 
var client= require('./keys'); 
var spotify = require('spotify');
var omdb = require('omdb');
var fs = require('fs');
var request = require('request');


switch(command){

 case("my-tweets"):

 	    doTwitt(); 

		break; 

 case("spotify-this-song"):

      process.argv.length === 3 ?  doSpotify("Ace of Base The Sign") : doSpotify(secondCommand); 

	    break; 

 case("movie-this"):

        process.argv.length === 3 ?  movieNobody() : doMovie(secondCommand); 

        break;

 case("do-what-it-says"):

 	   parseFile(); 
 	
       break; 

 default: 
	    console.log("Incorrect command"); 

	    break; 
}

function doTwitt(){

	var twitterClient= new Twitter(client.twitterKeys); 

	var params = { screen_name: 'Denyse004', count: 20 }

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {

		  for(var i=0; i<tweets.length ; i++){
		      console.log(tweets[i].text);

		      fs.appendFile("log.txt",tweets[i].text + '\n', function(err) {
                  if(err) {
                    return console.log(err);
			      }
			   });

		   console.log("Date created: " + tweets[i].created_at + "\n");

		   fs.appendFile("log.txt", tweets[i].created_at + '\n', function(err) {
                 if(err) {

                  return console.log(err);
			    }
			    });

			 }
		   }

		});
   }

 function doSpotify(query){


  spotify.search({
            type: 'track',
            query: query

         }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var song= "Song Name:" + query;   
            var artist= "Name of the Artist:" + data.tracks.items[0].album.artists[0].name + '\n';
            var album= "Name of the Album :" + data.tracks.items[0].album.name + '\n';
            var link= "Link to the url:"+ data.tracks.items[0].album.external_urls.spotify + '\n';    
            console.log(song);
            console.log(artist);
            console.log(album);
            console.log(link);

            fs.appendFile("log.txt",song  + artist+ album+ link, function(err) {
                 if(err) {

                  return console.log(err);
          }
          });

       });

        
        }
      
function movieNobody(){

request("http://omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=full&tomatoes=true&r=json", function (error, response, movie) {
  
	 if( error != null)
         console.log("Error"); 

    movie= JSON.parse(movie); // Print the HTML for the Google homepage. 

    var output=  movie.Title + '\n' +  movie.Year  + '\n' + movie.imdbRating  + '\n' + movie.Country + '\n' + movie.Plot + '\n' + movie.Actors + '\n' + movie.tomatoRating +'\n' +movie.tomatoURL;

    console.log(output); 


    fs.appendFile("log.txt", output, function(err) {
              if(err) {

               return console.log(err);
          }
          });

    }); 

    }

function doMovie(moviep){

  	request("http://omdbapi.com/?t=" + moviep + "&y=&plot=full&tomatoes=true&r=json", function (error, response, movie) {
  
	  if( error != null)
         console.log("Error"); 

    movie= JSON.parse(movie); // Print the HTML for the Google homepage. 

    var output=  movie.Title + '\n' +  movie.Year  + '\n' + movie.imdbRating  + '\n' + movie.Country + '\n' + movie.Plot + '\n' + movie.Actors + '\n' + movie.tomatoRating +'\n' +movie.tomatoURL;

    console.log(output); 

    fs.appendFile("log.txt", output, function(err) {
              if(err) {

               return console.log(err);
          }
          });

    }); 

	}


function parseFile(){

   fs.readFile('random.txt', 'utf8', function(err, data){
 		 if (err){ throw err; return};  
 			
 	     var command= data.split(","); 

 	     var firstArgument= command[0];

 	     var secondArgument= command[1];  

 	     if(firstArgument==="spotify-this-song"){
 	         doSpotify(secondArgument); 
 	      }

 	     else if( firstArgument==="movie-this"){
 	     	 doMovie(secondArgument); 
 	     }

 	     else if(firstArgument==="my-tweets"){
 	     		doTwitt(); 
 	     }
		  
		  });

  }










