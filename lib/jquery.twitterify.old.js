(function($) {

  $.fn.twitterify = function (options) {

    var defaults;

    defaults = {
      'count': 5,
      'include_retweets': true,
      'exclude_replies': true
    };
    options = $.extend(defaults, options);

    return this.each(function () {

      var self, twitterifier;

      self = $(this);
      twitterifier = new Twitterifier(self, options);
      twitterifier.init();
    });
  };

  var Twitterifier = function (container, options) {

    var LOADING_CLASS, HTTP_METHOD, DATA_TYPE, TIMELINE_URL, ANIMATION_DURATION, tweetList;

    LOADING_CLASS = 'loading';
    HTTP_METHOD = 'GET';
    DATA_TYPE = 'jsonp';
    TIMELINE_URL = 'http://api.twitter.com/1/statuses/user_timeline.json';
    ANIMATION_DURATION = 300;

    tweetList = container.find('ol').first();

    this.init = function () {

      // TODO: Add validation for list element.
      // TODO: Add validation for required parameters.
      // TODO: Add refresh interval.

      container.addClass(LOADING_CLASS);
      $.ajax({
        type: HTTP_METHOD,
        url: TIMELINE_URL,
        data: generateQueryData(),
        dataType: DATA_TYPE,
        context: this,
        complete: onRequestComplete,
        error: onRequestFailure,
        success: onRequestSuccess
      });
    };

    function generateQueryData() {
      return {
        'screen_name': options['screen_name'],
        'count': options['count'],
        'exclude_replies': options['exclude_replies'],
        'include_rts': options['include_retweets'],
        'include_entities': true
      };
    }

    function onRequestComplete(xhr, status) {
      container.removeClass(LOADING_CLASS);
    }

    function onRequestFailure(xhr, status, error) {
      // TODO: Handle failures.
    }

    function onRequestSuccess(data, status, xhr) {

      var tweet, formatter;

      $(data).each(function (i, tweetData) {
        tweet = new Tweet(tweetData);
        formatter = new TweetFormatter();
        formatter.format(tweet)
          .hide()
          .appendTo(tweetList)
          .delay(i * ANIMATION_DURATION)
          .slideDown(ANIMATION_DURATION);
      });
    }
  };

}(jQuery));
