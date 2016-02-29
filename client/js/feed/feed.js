angular.module('tedTalkFeedApp.feed', ['tedTalkFeedApp.feedService'])

.controller('feedCtrl', function($scope, TedTalkFeedFactory){
  $scope.tedTalkList = null;

  TedTalkFeedFactory.getTedTalkList().then(function(tedTalkList) {
    console.log(tedTalkList);
    $scope.tedTalkList = tedTalkList;
  });

  $scope.showControlIcons = function() {
    this.tedTalk.areControlIconsVisible = true;
  };

  $scope.hideControlIcons = function() {
    this.tedTalk.areControlIconsVisible = false;
  };

  $scope.showMoreInfo = function() {
    this.tedTalk.isMoreInfoVisible = true;
  };

});
