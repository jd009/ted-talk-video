var app = angular.module('tedTalkFeedApp',[
                         'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'content': {
          templateUrl: '/feed/feed.html',
          controller: 'feedCtrl'
        }
      }
    });
});

