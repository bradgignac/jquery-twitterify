describe('TweetLoader', function () {

  var loader, ajaxOptions;

  beforeEach(function () {
    this.addMatchers({
      toContain: function (key, value) {
        return this.actual[key] === value;
      }
    });

    loader = new twitterify.TweetLoader();

    spyOn(jQuery, 'ajax').andCallFake(function (params) {
      ajaxOptions = params;
    });
  });

  it('makes JSONP GET request to correct URL on load', function () {
    loader.load();

    expect(ajaxOptions.type).toBe('GET');
    expect(ajaxOptions.url).toBe('http://api.twitter.com/1/statuses/user_timeline.json');
    expect(ajaxOptions.dataType).toBe('jsonp');
  });

  it('builds request data based upon provided options', function () {
    loader.setScreenName('foo');
    loader.setCount(100);
    loader.setIncludeRetweets(false);
    loader.setExcludeReplies(true);

    loader.load();

    expect(ajaxOptions.data).toContain('screen_name', 'foo');
    expect(ajaxOptions.data).toContain('count', 100);
    expect(ajaxOptions.data).toContain('include_rts', false);
    expect(ajaxOptions.data).toContain('exclude_replies', true);
    expect(ajaxOptions.data).toContain('include_entities', true);
  });

  it('wires up callbacks with correct context', function () {

    var error, success, context;

    error = function () {};
    success = function () {};
    context = this;
    loader.load(success, error, context);

    expect(ajaxOptions.success).toBe(success);
    expect(ajaxOptions.error).toBe(error);
    expect(ajaxOptions.context).toBe(context);
  });
});
