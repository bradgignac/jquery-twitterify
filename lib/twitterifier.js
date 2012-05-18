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
