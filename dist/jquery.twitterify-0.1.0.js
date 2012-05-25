/* jquery-twitterify - v0.1.0 - 2012-05-24
 * http://github.com/bradgignac/jquery-twitterify
 * Copyright (c) 2012 Brad Gignac; Licensed MIT */

(function ($, window) {

  $.fn.twitterify = function (options) {
    return this.each(function () {
      new window.twitterify.Twitterifier(this, options)
        .init()
        .load();
    });
  };

}(jQuery, window));

/*jshint sub: true*/

(function (window) {

  var Tweet = function (data) {
    this.text = data['text'];
    this.date = new Date(data['created_at']);
  };

  window.twitterify = window.twitterify || {};
  window.twitterify.Tweet = Tweet;

}(window));

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

(function ($, window) {

  var TweetLoader, TweetRenderer, Twitterifier;

  TweetLoader = window.twitterify.TweetLoader;
  TweetRenderer = window.twitterify.TweetRenderer;

  Twitterifier = function (element, options) {
    this.element = element;
    this.options = options;
    this.metadata = $(element).data('twitterify');
    this.loader = new TweetLoader();
    this.renderer = new TweetRenderer();
  };

  Twitterifier.prototype.init = function () {
    this.config = $.extend({}, Twitterifier.Defaults, this.options, this.metadata);

    this.loader.setScreenName(this.config.screenName);
    this.loader.setCount(this.config.count);
    this.loader.setIncludeRetweets(this.config.includeRetweets);
    this.loader.setExcludeReplies(this.config.excludeReplies);

    this.renderer.init(this.element);

    return this;
  };

  Twitterifier.prototype.load = function () {
    this.loader.load(onLoadSuccess, onLoadFailure, this);
    this.renderer.showLoading();
    return this;
  };

  function onLoadSuccess(tweets) {
    this.renderer.hideLoading();
    this.renderer.addTweets(tweets);
  }

  function onLoadFailure(error) {
    this.renderer.hideLoading();
    this.renderer.showError(error);
  }

  Twitterifier.Defaults = {
    'count': 5,
    'includeRetweets': true,
    'excludeReplies': true
  };

  window.twitterify = window.twitterify || {};
  window.twitterify.Twitterifier = Twitterifier;

}(jQuery, window));
