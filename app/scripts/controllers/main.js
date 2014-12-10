'use strict';

/**
 * @ngdoc function
 * @name mihApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mihApp
 */
angular.module('mihApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
