describe('TweetRenderer', function () {

  var renderer;

  beforeEach(function () {
    setFixtures('<div id="tweet-container"></div>');

    container = document.getElementById('tweet-container');
    renderer = new twitterify.TweetRenderer();
    renderer.init(container);
  });

  it('wraps rendered tweets in an OL', function () {
    expect(getTweetList()).toBe('OL');
  });

  it('adds loading class when showLoading is called', function () {
    renderer.showLoading();
    expect(getTweetList()).toHaveClass('loading');
  });

  it('removes loading class when hideLoading is called', function () {
    renderer.showLoading();
    renderer.hideLoading();
    expect(getTweetList()).not.toHaveClass('loading');
  });

  it('renders one tweet', function () {

    var tweet, tweetElement;

    tweet = createTweet('foo', new Date(2012, 4, 1));
    renderer.addTweet(tweet);

    tweetElement = getTweetAt(0);
    expectTweetText(tweetElement, 'foo');
    expectTweetDate(tweetElement, 'May 1');
  });

  it('renders multiple tweets', function () {

    var i, tweet, tweets, tweetElement;

    tweets = [];
    for (i = 0; i < 5; i += 1) {
      tweet = createTweet(i, new Date(2012, 11, 5));
      tweets.push(tweet);
    }

    renderer.addTweets(tweets);

    for (i = 0; i < 5; i += 1) {
      tweetElement = getTweetAt(i);
      expectTweetText(tweetElement, i.toString());
      expectTweetDate(tweetElement, 'December 5');
    }
  });

  function getTweetList() {
    return $(container).children().first();
  }

  function createTweet(text, date) {

    var tweet;

    tweet = new twitterify.Tweet({});
    tweet.text = text;
    tweet.date = date;
    return tweet;
  }

  function getTweetAt(index) {
    return getTweetList().children().get(index);
  }

  function expectTweetText(tweet, content) {

    var paragraph;

    paragraph = tweet.firstChild;
    expect(paragraph.innerText).toBe(content);
  }

  function expectTweetDate(tweet, date) {

    var paragraph;

    paragraph = tweet.lastChild;
    expect(paragraph.innerText).toBe(date);
  }
});
