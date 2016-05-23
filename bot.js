// Debug flag

var debug = false;


// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));


// This is the URL of a search for the latest tweets on the #hashtag.
var hastagSearch = { q: "#beyondthetankSharkTank OR #SharkTank", count: 3, result_type: "recent" };

// A user stream
var stream = T.stream('statuses/filter', { track : ['@SharkTankBot'] } );
// When someone follows the user
stream.on('follow', followed);
stream.on('tweet', tweetEvent);

// In this callback we can see the name and screen name
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  var response = "You are definately a HERO, " + name + " @" + screenName + "🤑!!"
    // Post that tweet!
    T.post('statuses/update', { status: response }, tweeted);

  console.log('I was followed by: ' + name + ' @' + screenName);
}


// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  // var txt = tweet.text;
  // the status update or tweet ID in which we will reply
  var nameID  = tweet.id_str;

  // Get rid of the @ mention
  // var txt = txt.replace(/@myTwitterHandle/g, "");

  // Start a reply back to the sender
  var reply = "You mentioned me! @" + name + ' ' + ' #MyNewBestFriend🤑!!';
  var params             = {
    status: reply,
    in_reply_to_status_id: nameID
  };

  T.post('statuses/update', params, function(err, data, response) {
    if (err !== undefined) {
      console.log(err);
    } else {
      console.log('Tweeted: ' + params.status);
    }
  })
};

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest() {
  T.get('search/tweets', hastagSearch, function(error, data) {

    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
    // If our search request to the server had no errors...
    if (!error) {
      // ...then we grab the ID of the tweet we want to retweet...
      var retweetId = data.statuses[0].id_str;
      // ...and then we tell Twitter we want to retweet it!
      T.post('statuses/retweet/' + retweetId, {}, tweeted)
    }
    // However, if our original search request had an error, we want to print it out here.
    else {
      if (debug) {
        console.log('There was an error with your hashtag search:', error);
      }
    }
  });
}

// Make sure it worked!
function tweeted(err, reply) {
  if (err !== undefined) {
    console.log(err);
  } else {
    console.log('Tweeted: ' + reply);
  }
};


// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60. Currently set for 13 seconds
setInterval(retweetLatest, 1000 * 13);
