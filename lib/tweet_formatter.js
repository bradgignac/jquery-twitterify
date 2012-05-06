(function($) {

  // TODO: This should be a TweetDisplayer.
  // TODO: Only instantiate one TweetDisplayer.
  // TODO: Encode tweet data.
  // TODO: Move tweet loading into its own class.
  var TweetFormatter = function () {
    this.format = function (tweet) {

      var content, date, meta;

      content = $('<p>').text(tweet.text);
      date = $('<span>')
        .addClass('author')
        .text(formatDate(tweet.createdAt));
      meta = $('<p>').append(date);
      return $('<li>').append(content).append(meta);
    };

    function formatDate(date) {

      var month, day;

      month = TweetFormatter.Months[date.getMonth()];
      day = date.getDate();
      return [month, day].join(' ');
    };
  };

  TweetFormatter.Months = {
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

}(jQuery));
