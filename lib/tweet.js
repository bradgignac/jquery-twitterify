/*jshint sub: true*/

(function (window) {

  var Tweet = function (data) {
    this.text = data['text'];
    this.date = new Date(data['created_at']);
  };

  window.twitterify = window.twitterify || {};
  window.twitterify.Tweet = Tweet;

}(window));
