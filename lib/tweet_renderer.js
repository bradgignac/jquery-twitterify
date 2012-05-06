var TweetRenderer;

(function ($) {

  TweetRenderer = function () {

    var list;

    this.render = function (container) {
      list = $('<ol></ol>');
      list.appendTo(container);
    };

    this.addTweets = function (tweets) {

      var i, length;

      length = tweets.length;
      for (i = 0; i < length; i += 1) {
        this.addTweet(tweets[i]);
      }
    };

    this.addTweet = function (tweet) {

      var formattedDate, text, date, listItem;

      formattedDate = formatDate(tweet.getDate());
      text = $('<p></p>').text(tweet.getRawText());
      date = $('<p></p>').text(formattedDate);
      listItem = $('<li></li>')
        .hide()
        .append(text)
        .append(date)
        .appendTo(list)
        .slideDown(TweetRenderer.ANIMATION_DURATION);
    };

    function formatDate(date) {

      var month, day;

      month = TweetRenderer.MONTHS[date.getMonth()];
      day = date.getDate();
      return [month, day].join(' ');
    }
  };

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

}(jQuery));
