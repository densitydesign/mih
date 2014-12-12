'use strict';

/**
 * @ngdoc directive
 * @name mihApp.directive:langlegend
 * @description
 * # langlegend
 */
angular.module('mihApp')
  .directive('langlegend',[ 'filemanager', 'crossfilterlang', '$timeout',function (filemanager, crossfilterlang, $timeout){
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, element, attrs) {
        
        var legend = mih.langLegend()
          .width(element.width())
          .height(50)

        var chart = d3.select(element[0]);

        scope.$watch('legendData', function(newValue, oldValue){
          if(newValue != oldValue){
              chart.datum(newValue).call(legend)
          }
        }, true)
      }
    };
  }]);
