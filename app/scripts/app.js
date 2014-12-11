'use strict';

/**
 * @ngdoc overview
 * @name mihApp
 * @description
 * # mihApp
 *
 * Main module of the application.
 */
angular
  .module('mihApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.slider'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/twitterLang', {
        templateUrl: 'views/twitterlang.html',
        controller: 'TwitterlangCtrl'
      })
      .when('/twitterHashtags', {
        templateUrl: 'views/twitterhashtags.html',
        controller: 'TwitterhashtagsCtrl'
      })
      .when('/foursquare', {
        templateUrl: 'views/foursquare.html',
        controller: 'FoursquareCtrl'
      })
      .when('/instagram', {
        templateUrl: 'views/instagram.html',
        controller: 'InstagramCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
