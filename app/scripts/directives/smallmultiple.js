'use strict';

/**
 * @ngdoc directive
 * @name mihApp.directive:smallmultiple
 * @description
 * # smallmultiple
 */
angular.module('mihApp')
  .directive('smallmultiple',[ 'filemanager', 'crossfilterlang', '$timeout',function (filemanager, crossfilterlang, $timeout){
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, element, attrs) {

          
          var checkins,
              finalData;
          var sm = mih.smallmultiple()
                    //.width(element.width())
                    //.height(200)

          var chart = d3.select(element[0]);

          filemanager
            .getFile('data/foursquare.csv')
            .then(
              function(data){
                
                checkins = d3.tsv.parse(data);

                var format, nest;

                format = d3.time.format("%Y-%m-%d");

                checkins.forEach(function(d) {
                  d.day = format.parse(d.day);
                  return d.diff = +d.diff;
                });

                checkins = d3.nest()
                  .key(function(d) {
                  return d.nil;
                    })
                  .key(function(d) {
                  return d.cat;
                    })
                  .sortValues(function(a, b) {
                  return d3.ascending(a.day, b.day);
                    }) 
                  .entries(checkins);

                
                  //finalData = checkins.filter(function(d){return d.key == "2"})
                  //finalData = finalData[0].values
                
                  //update()

              },
              function(error){
                console.log(error)
              })
          
          var update = function(data, nil){
            var finalData = checkins.filter(function(d){return d.key == nil.toString()})
                finalData = finalData[0].values
            chart.datum(finalData).call(sm)
          }

          scope.$watch('selectedNil', function(newValue, oldValue){
          if(newValue != oldValue){
              update(checkins, newValue)
          }
        }, true)
       /*

  setupIsoytpe = function() {
    $("#vis").isotope({
      itemSelector: '.chart',
      layoutMode: 'fitRows',
      getSortData: {
        count: function(e) {
          var d, sum;
          d = d3.select(e).datum();
          sum = d3.sum(d.values, function(d) {
            return d.diff;
          });
          return sum * -1;
        },
        name: function(e) {
          var d;
          d = d3.select(e).datum();
          return d.key;
        }
      }
    });
    return $("#vis").isotope({
      sortBy: 'count'
    });
  };

  $(function() {
    var display, plot;
    plot = SmallMultiples();
    display = function(error, rawData) {
      var data;
      if (error) {
        console.log(error);
      }
      data = transformData(rawData);
      plotData("#vis", data, plot);
      return setupIsoytpe();
    };
    queue().defer(d3.tsv, "data/foursquare.csv").await(display);
    return d3.select("#button-wrap").selectAll("div").on("click", function() {
      var id;
      id = d3.select(this).attr("id");
      d3.select("#button-wrap").selectAll("div").classed("active", false);
      d3.select("#" + id).classed("active", true);
      return $("#vis").isotope({
        sortBy: id
      });
    });
  });

}).call(this);
*/
      }
    };
  }]);
