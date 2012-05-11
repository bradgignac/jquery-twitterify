(function ($) {

  $.fn.twitterify = function (screenName, options) {

    var self, tweetLoader;

    self = this;
    tweetLoader = new TweetLoader(screenName, options);
    tweetLoader.onSuccess(onLoadSuccess);
    tweetLoader.onFailure(onLoadFailure);
    tweetLoader.load();

    return this.each(initializeElement);

    function initializeElement(i, element) {

      var renderer;

      renderer = new TweetRenderer();
      renderer.render(element);
      renderer.showLoading();

      this.getRenderer = function () {
        return renderer;
      };
    }

    function onLoadSuccess(tweets) {
      self.each(function (i, element) {

        var renderer;

        renderer = element.getRenderer();
        renderer.hideLoading();
        renderer.addTweets(tweets);
      });
    }

    function onLoadFailure(error) {
      // self.each() -> show failur
    }
  };

}(jQuery));
