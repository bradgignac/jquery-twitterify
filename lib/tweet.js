/*jshint sub: true*/

var Tweet;

(function ($) {

  // TODO: Add support for tweet entities.

  Tweet = function (data) {

    var text, date;

    text = data['text'];
    date = new Date(data['created_at']);

    this.getRawText = function () {
      return text;
    };

    this.getDate = function () {
      return date;
    };
  };

}(jQuery));
