'use strict';

/**
 * @ngdoc directive
 * @name mihApp.directive:mapnil
 * @description
 * # mapnil
 */
angular.module('mihApp')
  .directive('mapnil', ['filemanager', 'crossfilterlang', '$timeout',function (filemanager, crossfilterlang, $timeout){
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {

	    var tonerTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png', {
	  						attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
							})


	     var mapNil = L.map(
	     	element[0],
	     	{maxBounds: [[45.3705,9.0404],[45.5554,9.3288]]}
	     	).setView([45.460, 9.194], 11);

	    var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
		  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
		    attributionControl: false,
		    infoControl: true,
		    minZoom:10,
		    maxZoom:16
		}).addTo(mapNil);

      }
    };
  }]);
