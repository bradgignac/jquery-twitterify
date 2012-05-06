(function($) {

  var Tweet = function (data) {

    // TODO: Provide formattedTweet() method.

    this.text = data['text'];
    this.createdAt = new Date(data['created_at']);
  };

}(jQuery));
