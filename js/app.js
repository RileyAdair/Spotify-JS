angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../views/home.html',
      controller: 'homeCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: '../views/search.html',
      controller: 'searchCtrl'
    })
    .state('artist', {
      url: '/artist/:id',
      templateUrl: "../views/artist.html",
      controller: 'artistCtrl'
    })
    .state('music', {
      url: '/music',
      templateUrl: '../views/music.html',
      controller: 'musicCtrl'
    })
});
