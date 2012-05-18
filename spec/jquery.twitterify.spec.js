describe('jquery.twitterify', function () {

  var element, twitterifier, options, plugin;

  beforeEach(function () {
    setFixtures('<div id="one"></div>');

    element = $('#one');
    options = {};
    twitterifier = {
      init: function () { return this; },
      load: function () { return this; }
    };
    spyOn(twitterify, 'Twitterifier').andReturn(twitterifier);
  });

  it('creates a Twitterifier', function () {
    plugin = element.twitterify(options);
    expect(twitterify.Twitterifier).toHaveBeenCalledWith(element.get(0), options);
  });

  it('intializes a Twitterifier', function () {
    spyOn(twitterifier, 'init').andReturn(twitterifier);
    plugin = element.twitterify(options);
    expect(twitterifier.init).toHaveBeenCalled();
  });

  it('loads tweets', function () {
    spyOn(twitterifier, 'load').andReturn(twitterifier);
    plugin = element.twitterify(options);
    expect(twitterifier.load).toHaveBeenCalled();
  });
});
