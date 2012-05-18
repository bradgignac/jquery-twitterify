describe('Twitterify', function () {

  var container, options, twitterifier, loader, renderer;

  beforeEach(function () {
    setFixtures('<div id="container"></div>');
    container = document.getElementById('container');
    container.setAttribute('data-twitterify', JSON.stringify({ screenName: 'someUser' }));

    options = {};
    twitterifier = new twitterify.Twitterifier(container, options);
    loader = twitterifier.loader;
    renderer = twitterifier.renderer;
  });

  it('builds configuration when initialized', function () {
    options.count = 3;
    options.includeRetweets = false;
    twitterify.Twitterifier.Defaults.excludeReplies = false;

    twitterifier.init();

    expect(twitterifier.config).toEqual({
      count: 3,
      includeRetweets: false,
      excludeReplies: false,
      screenName: 'someUser'
    });
  });

  it('sets load options when initialized', function () {
    spyOn(loader, 'setScreenName');
    twitterifier.init();
    expect(loader.setScreenName).toHaveBeenCalledWith('someUser');
  });

  it('initializes renderer when initialized', function () {
    spyOn(renderer, 'init');
    twitterifier.init();
    expect(renderer.init).toHaveBeenCalledWith(container);
  });

  it('loads tweets when load is called', function () {
    spyOn(loader, 'load');
    twitterifier.init().load();
    expect(loader.load).toHaveBeenCalled();
  });

  it('shows loading when load is called', function () {
    spyOn(renderer, 'showLoading');
    twitterifier.init().load();
    expect(renderer.showLoading).toHaveBeenCalled();
  });

  it('hides loading after loading has succeeded', function () {
    spyOn(loader, 'load');
    spyOn(renderer, 'hideLoading');

    twitterifier.init().load();
    fireSuccessCallbackWithTweets([]);

    expect(renderer.hideLoading).toHaveBeenCalled();
  });

  it('displays tweets after load has succeeded', function () {

    var tweets;

    spyOn(loader, 'load');
    spyOn(renderer, 'addTweets');

    tweets = [];
    twitterifier.init().load();
    fireSuccessCallbackWithTweets(tweets);

    expect(renderer.addTweets).toHaveBeenCalledWith(tweets);
  });

  function fireSuccessCallbackWithTweets(tweets) {

    var args, callback, context;

    args = loader.load.mostRecentCall.args;
    callback = args[0];
    context = args[2];
    callback.call(context, tweets);
  }

  it('hides loading after loading has failed', function () {
    spyOn(loader, 'load');
    spyOn(renderer, 'hideLoading');

    twitterifier.init().load();
    fireErrorCallbackWithMessage('This is a message!');

    expect(renderer.hideLoading).toHaveBeenCalled();
  });

  it('displays error message after loading has failed', function () {

    var message;

    spyOn(loader, 'load');
    spyOn(renderer, 'showError');

    message = 'This is a message!';
    twitterifier.init().load();
    fireErrorCallbackWithMessage(message);

    expect(renderer.showError).toHaveBeenCalledWith(message);
  });

  function fireErrorCallbackWithMessage(tweets) {

    var args, callback, context;

    args = loader.load.mostRecentCall.args;
    callback = args[1];
    context = args[2];
    callback.call(context, tweets);
  }
});
