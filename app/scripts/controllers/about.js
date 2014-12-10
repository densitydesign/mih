'use strict';

/**
 * @ngdoc function
 * @name mihApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mihApp
 */
angular.module('mihApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
