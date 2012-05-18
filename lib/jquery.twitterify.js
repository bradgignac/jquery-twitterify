(function ($, window) {

  $.fn.twitterify = function (options) {
    return this.each(function () {
      new window.twitterify.Twitterifier(this, options)
        .init()
        .load();
    });
  };

}(jQuery, window));
