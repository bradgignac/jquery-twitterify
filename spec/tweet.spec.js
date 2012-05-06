describe('Tweet', function () {

  var data, tweet;

  data = {
    "coordinates": null,
    "truncated": false,
    "favorited": false,
    "created_at": "Mon Jun 27 19:32:19 +0000 2011",
    "id_str": "85430275915526144",
    "entities": {
      "urls": [{
        "expanded_url": "http://tumblr.com/xnr37hf0yz",
        "url": "http://t.co/cCIWIwg",
        "indices": [107, 126],
        "display_url": "tumblr.com/xnr37hf0yz"
      }],
      "hashtags": [],
      "user_mentions": []
    },
    "in_reply_to_user_id_str": null,
    "text": "Misleading error message - If you try to follow a user who was recently suspended, you may see an error... http://t.co/cCIWIwg",
    "contributors": null,
    "in_reply_to_status_id_str": null,
    "id": 85430275915526144,
    "retweet_count": 25,
    "geo": null,
    "retweeted": false,
    "in_reply_to_user_id": null,
    "source": "<a href=\"http://www.tumblr.com/\" rel=\"nofollow\">Tumblr</a>",
    "user": {
      "profile_sidebar_border_color": "0094C2",
      "profile_background_tile": false,
      "profile_sidebar_fill_color": "a9d9f1",
      "name": "Twitter API",
      "expanded_url": null,
      "location": "San Francisco, CA",
      "profile_image_url": "http://a0.twimg.com/profile_images/1396428969/twitterapi_normal.png",
      "created_at": "Wed May 23 06:01:13 +0000 2007",
      "follow_request_sent": false,
      "is_translator": false,
      "profile_link_color": "0094C2",
      "id_str": "6253282",
      "entities": {
        "urls": [],
        "hashtags": [],
        "user_mentions": []
      },
      "contributors_enabled": true,
      "favourites_count": 20,
      "default_profile": false,
      "url": "http://dev.twitter.com",
      "profile_image_url_https": "https://si0.twimg.com/profile_images/1396428969/twitterapi_normal.png",
      "id": 6253282,
      "utc_offset": -28800,
      "listed_count": 8641,
      "profile_use_background_image": true,
      "lang": "en",
      "followers_count": 561819,
      "profile_text_color": "437792",
      "protected": false,
      "time_zone": "Pacific Time (US & Canada)",
      "geo_enabled": true,
      "profile_background_image_url_https": "https://si0.twimg.com/profile_background_images/229557229/twitterapi-bg.png",
      "notifications": false,
      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
      "verified": true,
      "profile_background_color": "e8f2f7",
      "default_profile_image": false,
      "friends_count": 30,
      "profile_background_image_url": "http://a2.twimg.com/profile_background_images/229557229/twitterapi-bg.png",
      "statuses_count": 2928,
      "display_url": null,
      "screen_name": "twitterapi",
      "show_all_inline_media": false,
      "following": true
    },
    "in_reply_to_screen_name": null,
    "place": null,
    "in_reply_to_status_id": null
  };

  beforeEach(function () {
    tweet = new Tweet(data);
  });

  it('parses raw tweet text', function () {
    expect(tweet.getRawText()).toBe('Misleading error message - If you try to follow a user who was recently suspended, you may see an error... http://t.co/cCIWIwg');
  });

  it('converts the created date to a JavaScript date', function () {
    expect(tweet.getDate().toUTCString()).toBe('Mon, 27 Jun 2011 19:32:19 GMT');
  });
});
