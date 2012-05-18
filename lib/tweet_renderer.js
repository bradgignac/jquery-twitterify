(function ($, window) {

  var Tweet, TweetRenderer;

  TweetRenderer = function () {
    this.list = $('<ol></ol>');
  };

  TweetRenderer.prototype.init = function (container) {
    this.list.appendTo(container);
  };

  TweetRenderer.prototype.showLoading = function () {
    this.list.addClass(TweetRenderer.LOADING_CLASS);
  };

  TweetRenderer.prototype.hideLoading = function () {
    this.list.removeClass(TweetRenderer.LOADING_CLASS);
  };

  TweetRenderer.prototype.showError = function () {};

  TweetRenderer.prototype.addTweets = function (tweets) {
    var i, length;

    length = tweets.length;
    for (i = 0; i < length; i += 1) {
      this.addTweet(tweets[i]);
    }
  };

  TweetRenderer.prototype.addTweet = function (tweet) {

    var text, date, listItem;

    text = $('<p></p>').text(tweet.text);
    date = $('<p></p>').text(formatDate(tweet.date));
    listItem = $('<li></li>')
      .hide()
      .append(text)
      .append(date)
      .appendTo(this.list)
      .slideDown(TweetRenderer.ANIMATION_DURATION);
  };

  function formatDate(date) {

    var month, day;

    month = TweetRenderer.MONTHS[date.getMonth()];
    day = date.getDate();
    return [month, day].join(' ');
  }

  TweetRenderer.LOADING_CLASS = 'loading';
  TweetRenderer.ANIMATION_DURATION = 300;
  TweetRenderer.MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  window.twitterify = window.twitterify || {};
  window.twitterify.TweetRenderer = TweetRenderer;

}(jQuery, window));
