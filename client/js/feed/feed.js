angular.module('tedTalkFeedApp.feed', ['tedTalkFeedApp.feedService'])

.controller('feedCtrl', function($scope, TedTalkFeedFactory){
  $scope.tedTalkList = null;

  TedTalkFeedFactory.getTedTalkList().then(function(tedTalkList) {
    console.log(tedTalkList);
    $scope.tedTalkList = tedTalkList;
  });

});
