(function ($, window) {

  var TweetLoader = function () {
  };

  TweetLoader.prototype.setScreenName = function (screenName) {
    this.screenName = screenName;
  };

  TweetLoader.prototype.setCount = function (count) {
    this.count = count;
  };

  TweetLoader.prototype.setIncludeRetweets = function (includeRetweets) {
    this.includeRetweets = includeRetweets;
  };

  TweetLoader.prototype.setExcludeReplies = function (excludeReplies) {
    this.excludeReplies = excludeReplies;
  };

  TweetLoader.prototype.load = function (successCallback, errorCallback, context) {
    $.ajax({
      type: TweetLoader.HTTP_METHOD,
      url: TweetLoader.TIMELINE_URL,
      data: {
        screen_name: this.screenName,
        count: this.count,
        include_rts: this.includeRetweets,
        exclude_replies: this.excludeReplies,
        include_entities: true
      },
      dataType: TweetLoader.DATA_TYPE,
      context: context,
      error: errorCallback,
      success: successCallback
    });
  };

  TweetLoader.HTTP_METHOD = 'GET';
  TweetLoader.TIMELINE_URL = 'http://api.twitter.com/1/statuses/user_timeline.json';
  TweetLoader.DATA_TYPE = 'jsonp';

  window.twitterify = window.twitterify || {};
  window.twitterify.TweetLoader = TweetLoader;

}(jQuery, window));
