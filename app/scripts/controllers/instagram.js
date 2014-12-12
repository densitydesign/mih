'use strict';

/**
 * @ngdoc function
 * @name mihApp.controller:InstagramCtrl
 * @description
 * # InstagramCtrl
 * Controller of the mihApp
 */
angular.module('mihApp')
  .controller('InstagramCtrl', function ($scope,Fileloader) {

        $scope.data = [];
        Fileloader.getFile("data/instagram.json").then(function(data){
            //console.log(data);
            $scope.see = true;

            $scope.data = data;

            $scope.data.forEach(function(d){
                var col = d3.rgb(d.color);
                var hsl = col.hsl();
                d.h = hsl.h;
                d.s = hsl.s;
                d.l = hsl.l;

            })
            $scope.zone = null;
            $scope.selected = [];

            $scope.sort = "l";

            $scope.slide = 50;

            $scope.$watch("sort",function(newValue,oldValue){
                if(newValue!==oldValue) {
                    $scope.selected.sort(function(a,b){
                        return b[newValue]-a[newValue];
                    })
                }
            })

        });
  });
