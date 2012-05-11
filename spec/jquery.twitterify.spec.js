describe('jquery.twitterify', function () {

  var twitterify, loader, renderer, elements;

  beforeEach(function () {
    setFixtures([
      '<div id="one"></div>',
      '<div id="two"></div>'
    ].join());

    loader = {
      onFailure: jasmine.createSpy('onFailure'),
      onSuccess: jasmine.createSpy('onSuccess'),
      load: jasmine.createSpy('load')
    };
    spyOn(window, 'TweetLoader').andReturn(loader);

    renderer = {
      render: jasmine.createSpy('render'),
      addTweets: jasmine.createSpy('addTweets'),
      showLoading: jasmine.createSpy('showLoading'),
      hideLoading: jasmine.createSpy('hideLoading')
    };
    spyOn(window, 'TweetRenderer').andReturn(renderer);

    elements = $('#one, #two');
  });

  it('passes the screen name and options to the loader', function () {

    var options;

    options = {};
    twitterify = elements.twitterify('user', options);
    expect(TweetLoader).toHaveBeenCalledWith('user', options);
  });

  it('loads tweets', function () {
    twitterify = elements.twitterify('user');
    expect(loader.load).toHaveBeenCalled();
  });

  it('renders tweets after being loaded', function () {

    var tweets;

    tweets = loadAndReturnTweets();
    expect(renderer.render.callCount).toBe(2);
  });

  it('shows loading while tweets are being loaded', function () {

    var tweets;

    tweets = loadAndReturnTweets();
    expect(renderer.showLoading.callCount).toBe(2);
  });

  function loadAndReturnTweets() {

    var tweets;

    tweets = [{}, {}, {}];
    twitterify = elements.twitterify('user');
    return tweets;
  }

  function fireSuccess(tweets) {

    var callback;

    callback = loader.onSuccess.mostRecentCall.args[0];
    callback.call(twitterify, tweets);
  }

  it('shows tweets after being loaded', function () {

    var tweets, success;

    tweets = loadAndReturnTweets();
    success = fireSuccess(tweets);

    twitterify.each(function (i, element) {
      expect(element.getRenderer().addTweets).toHaveBeenCalledWith(tweets);
    });
  });

  it('hides loading after being loaded', function () {

    var tweets, success;

    tweets = loadAndReturnTweets();
    success = fireSuccess(tweets);

    expect(renderer.hideLoading.callCount).toBe(2);
  });

  // TODO: Shows error when loading failed.
});
