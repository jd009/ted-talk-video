angular.module('tedTalkFeedApp.feed', ['tedTalkFeedApp.feedService'])

.controller('feedCtrl', function($scope, TedTalkFeedFactory, $sce){
  $scope.tedTalkList = null;
  $scope.tedTalkToPlayTitle = null;
  $scope.tedTalkToPlaySpeaker = null;
  $scope.tedTalkToPlayUrl = null;

  loadFeed();

  function loadFeed() {
    $('#initial-loading-spinner').show();
    TedTalkFeedFactory.getTedTalkList().then(function(tedTalkList) {
      $scope.tedTalkList = tedTalkList;
      $('#initial-loading-spinner').hide();
    });
  }

  $scope.playTedTalk = function() {
    $('#videoModal').modal('show');
    $('#loading-spinner').show();

    var videoPlayerDomObject = $('#videoPlayer')[0];
    videoPlayerDomObject.addEventListener('loadeddata', function() {
      $('#loading-spinner').hide();
    }, false);

    $scope.tedTalkToPlayTitle = this.tedTalk.title;
    $scope.tedTalkToPlaySpeaker = this.tedTalk.speaker;
    $scope.tedTalkToPlayUrl = $sce.trustAsResourceUrl(this.tedTalk.mediaURL);
  };

  $scope.closePlayingTedTalk = function() {
    var videoPlayerDomObject = $('#videoPlayer')[0];
    videoPlayerDomObject.pause();
    $scope.tedTalkToPlayUrl = null;
    $scope.tedTalkToPlaySpeaker = null;
    $scope.tedTalkToPlayTitle = null;
    videoPlayerDomObject.src = '';
  };

  $scope.showControlIcons = function() {
    this.tedTalk.areControlIconsVisible = true;
  };

  $scope.hideControlIcons = function() {
    this.tedTalk.areControlIconsVisible = false;
  };

  $scope.showMoreInfo = function() {
    this.tedTalk.isMoreInfoVisible = true;
  };

  $scope.hideMoreInfo = function() {
    this.tedTalk.isMoreInfoVisible = false;
  };
});
