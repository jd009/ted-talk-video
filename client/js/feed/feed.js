angular.module('tedTalkFeedApp.feed', ['tedTalkFeedApp.feedService'])

.controller('feedCtrl', function(TedTalkFeedFactory, $window){
  TedTalkFeedFactory.getTedTalkVideos().then(function(tedTalkVideos) {
    console.log(tedTalkVideos);
  });

});
