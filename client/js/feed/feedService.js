angular.module('tedTalkFeedApp.feedService', [])

.factory('TedTalkFeedFactory', function($q, $window){

  var tedTalkFeed = null;

  function loadTedTalkFeed(deferred) {
    if( ! tedTalkFeed) {
      tedTalkFeed = new $window.google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
    }
    tedTalkFeed.load(function(result) {
      if(! result.error) {
        deferred.resolve(result.feed.entries);
      } else {
        deferred.reject(result.error);
      }
    });
  }

  function loadGoogleFeedApi(feedApiReadyCallback) {
    $window.google.load('feeds', '1', {'callback': feedApiReadyCallback});
  }

  var getTedTalkVideos = function(){
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
    getTedTalkVideos: getTedTalkVideos
  };
});
