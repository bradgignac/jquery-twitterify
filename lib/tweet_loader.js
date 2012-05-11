var TweetLoader;

(function ($) {

  TweetLoader = function (username, options) {};

  TweetLoader.HTTP_METHOD = 'GET';
  TweetLoader.DATA_TYPE = 'jsonp';
  TweetLoader.TIMELINE_URL = 'http://api.twitter.com/1/statuses/user_timeline.json';

}(jQuery));


// Load with options.
// Callback to complete.
// Callback to error.
// Callback to success.
