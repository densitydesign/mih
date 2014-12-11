'use strict';

/**
 * @ngdoc directive
 * @name mihApp.directive:mapnil4sq
 * @description
 * # mapnil4sq
 */
angular.module('mihApp')
  .directive('mapnil4sq', ['filemanager', 'crossfilterlang', '$timeout',function (filemanager, crossfilterlang, $timeout){
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {

	    var nil,
	    	mapNil = L.map(
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

		var svg = d3.select(mapNil.getPanes().overlayPane).append("svg"),
		    g = svg.append("g").attr("class", "leaflet-zoom-hide"),
		    feature,
		    nil;

		var transform = d3.geo.transform({point: projectPoint}),
      		path = d3.geo.path().projection(transform);

      	//var colorLangDomain = data.map(function(d){return d.key});
        //var colorLang = d3.scale.ordinal().range(stackColors).domain(colorDomain)
        var colorLang = d3.scale.category10()

	    filemanager
	        .getFile('data/NIL.json')
	        .then(
	          function(data){

	          	nil = data;
	          	feature = g.selectAll("path")
      					.data(nil.features, function(d){return d.properties['ID_NIL']})
    					.enter()
    					.append("path")
    					.attr("stroke", "white")
    					.attr("fill", "#ccc")
    					.attr("fill-opacity", 0.75)
  						
  				mapNil.on("viewreset", reset);
  				reset();


	          },
	          function(error){
	          	console.log(error)
	          })

	      // Reposition the SVG to cover the features.
		  function reset() {
		    var bounds = path.bounds(nil),
		        topLeft = bounds[0],
		        bottomRight = bounds[1];
		    svg .attr("width", bottomRight[0] - topLeft[0])
		        .attr("height", bottomRight[1] - topLeft[1])
		        .style("left", topLeft[0] + "px")
		        .style("top", topLeft[1] + "px");
		    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
		    feature.attr("d", path);
		  }
		  // Use Leaflet to implement a D3 geometric transformation.
		  function projectPoint(x, y) {
		    var point = mapNil.latLngToLayerPoint(new L.LatLng(y, x));
		    this.stream.point(point.x, point.y);
		  }

		//  var upadate = function(){
		 	
		//  	var nilDataLang = {}
		//  	scope.nilData.forEach(function(d){
		//  		var firstLang = d3.entries(d.value.langs);
		//  		firstLang.sort(function(a, b) {return b.value - a.value})
		//  		var id = d.key.split('_')[1]
		//  		if(firstLang.length){
		//  			nilDataLang[id] = firstLang[0].key
		//  		}
		//  	})

		//  	var colorDomain = _.uniq(d3.values(nilDataLang));
		//  	colorLang.domain(colorDomain)

		//  	console.log(nilDataLang)

		//  	feature.transition().duration(500)
		//  		.attr("fill", function(d){
		//  			var id = d.properties['ID_NIL']
		//  			if(nilDataLang[id]){
		//  				return colorLang(nilDataLang[id])
		//  			}else{
		//  				return "#ccc"
		//  			}
		//  		})
		//  }

		// scope.$watch('nilData', function(newValue, oldValue){
  //         if(newValue != oldValue){
  //             scope.nilData = newValue;
  //             upadate()
  //         }
  //       }, true)

      }
    };
  }]);
