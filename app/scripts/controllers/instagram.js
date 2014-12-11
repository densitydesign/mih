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
        Fileloader.getFile("data/instagram/result2.json").then(function(data){
            //console.log(data);
            $scope.see = true;


           /* var lol = d3.nest()
                .key(function(d){return d.nil})
                .entries(data);

            console.log(lol);
*/

            data.forEach(function(d){
                var col = d3.rgb(parseInt(d.r), parseInt(d.g), parseInt(d.b));
                var hsl = col.hsl();
                d.h = hsl.h;
                d.s = hsl.s;
                d.l = hsl.l;

            })




            $scope.selected = data.filter(function(d){
                return d.id_nil ==14;
            }).sort(function(a,b){
                return b.l- a.l;
            })

            console.log($scope.selected);

        });
  });
