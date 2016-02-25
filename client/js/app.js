var app = angular.module('tedTalkFeedApp',[
                         'ui.router',
                         'tedTalkFeedApp.feedService',
                         'tedTalkFeedApp.feed']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'content': {
          templateUrl: 'js/feed/feed.html',
          controller: 'feedCtrl'
        }
      }
    });
});

