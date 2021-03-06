angular.module('tedTalkFeedApp.feedService', [])

.factory('TedTalkFeedFactory', function($q, $window){

  var tedTalkFeed = null;

  function TedTalkFeedItem (feedEntry) {
    var feedEntryTitleComponents = feedEntry.title.split('|');
    this.title = feedEntryTitleComponents[0].trim();
    this.speaker = feedEntryTitleComponents[1].trim();

    this.originalLink = feedEntry.link;
    this.contentSnippet = feedEntry.contentSnippet;
    this.content = feedEntry.content.split('<')[0];
    this.categories = feedEntry.categories;
    // Only use the 3-char-day, digit-day-number month 4-digit-year and drop the time
    this.publishedDate = feedEntry.publishedDate.match(/^\w{3},\s\d+\s\w+\s\d{4}/)[0];

    var primaryMedia = feedEntry.mediaGroups[0].contents[0];
    this.previewImageURL = primaryMedia.thumbnails[0].url;
    this.mediaURL = primaryMedia.url;
    this.mediaType = primaryMedia.type;

    this.areControlIconsVisible = false;
    this.isMoreInfoVisible = false;
  }

  function loadTedTalkFeed(deferred) {
    if( ! tedTalkFeed) {
      tedTalkFeed = new $window.google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
    }
    tedTalkFeed.load(function(result) {
      if(! result.error) {
        var feedEntries = result.feed.entries;
        var tedTalkList = feedEntries.map(function(feedEntry) {
          var newTedTalkFeedItem = new TedTalkFeedItem(feedEntry);
          return newTedTalkFeedItem;
        });
        deferred.resolve(tedTalkList);
      } else {
        deferred.reject(result.error);
      }
    });
  }

  function loadGoogleFeedApi(feedApiReadyCallback) {
    $window.google.load('feeds', '1', {'callback': feedApiReadyCallback});
  }

  var getTedTalkList = function(){
    var deferred = $q.defer();

    var isGoogleFeedApiLoaded = !! $window.google.feeds;
    if(isGoogleFeedApiLoaded) {
      loadTedTalkFeed(deferred);
    } else {
      var feedApiReadyCallback = loadTedTalkFeed.bind(null, deferred);
      loadGoogleFeedApi(feedApiReadyCallback);
    }

    return deferred.promise;
  };

  return {
    getTedTalkList: getTedTalkList
  };
});
