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

}(jQuery));
