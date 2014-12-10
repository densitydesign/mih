'use strict';

/**
 * @ngdoc directive
 * @name mihApp.directive:timelineLang
 * @description
 * # timelineLang
 */
angular.module('mihApp')
  .directive('timelineLang',[ 'filemanager', 'crossfilterlang', '$timeout',function (filemanager, crossfilterlang, $timeout){
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, element, attrs) {

        var timelineData;

        var stacked = mih.stackedBar()
          .width(element.width())
          .height(200)
          .stackColors(["#7CA49E", "#D35530"])
          .on("brushing", function(d){
            // scope.startDate = d[0].getFullYear()
            // scope.endDate = d[1].getFullYear()
            // if(!scope.$$phase) {
            //   scope.$apply()
            // }
          })
          .on("brushed", function(d){

            crossfilterlang.day().filterRange(d)
            //console.log(crossfilterlang.id_nils().all())
            scope.nilData = crossfilterlang.id_nils().all();

            // scope.tableData = cfSource.year().top(Infinity).concat(cfTarget.year().top(Infinity))
            // scope.streamData = [
            //   {key:"first", values:[
            //     {y: cfSource.imp(), x:0, key:"first"},
            //     {y: cfTarget.exp(), x:1, key:"second"}
            //     ]
            //   },
            //   {key:"second", values:[
            //     {y: cfSource.exp(), x:0, key:"second"},
            //     {y: cfTarget.imp(), x:1, key:"first"}
            //     ]
            //   }
            // ]
            if(!scope.$$phase) {
              scope.$apply()
            }
          })

        var chart = d3.select(element[0]);
        
        var init = function(){
          
          filemanager
            .getFile('data/out_nil.tsv')
            .then(
              function(data){
                
                var tweets = d3.tsv.parse(data);
                
                if(!tweets.length){
                	return
                };

                // if(cfSource.size()>0){
                //   cfSource.year().filterAll()
                //   cfSource.type().filterAll()
                //   cfSource.clear();
                // }

                crossfilterlang.add(tweets);



                // scope.startDate = cfSource.year().bottom(1)[0].year
                // scope.endDate = cfSource.year().top(1)[0].year

                // scope.minDate = cfSource.year().bottom(1)[0].year
                // scope.maxDate = cfSource.year().top(1)[0].year
                
                // scope.tableData = cfSource.year().top(Infinity).concat(cfTarget.year().top(Infinity))
                
                // scope.reportings = [scope.entities.sourceEntity.selected.RICname]
                // scope.partners = [scope.entities.targetEntity.selected.RICname]

                // scope.streamData = [
                //   {key:"first", values:[
                //     {y: cfSource.imp(), x:0, key:"first"},
                //     {y: cfTarget.exp(), x:1, key:"second"}
                //     ]
                //   },
                //   {key:"second", values:[
                //     {y: cfSource.exp(), x:0, key:"second"},
                //     {y: cfTarget.imp(), x:1, key:"first"}
                //     ]
                //   }
                // ]

                timelineData = [{key:"tweets", values:_.map(crossfilterlang.days().all(), _.clone)}];

                crossfilterlang.lang().filterFunction(function(d) { return d != "it" && d != "en"})
                scope.nilData = crossfilterlang.id_nils().all();
                //var langs = crossfilterlang.langs().all()
                //scope.langs = langs.map(function(d){return d.key})


                // flows.sort(function(a, b){ return d3.ascending(a.year, b.year); })
                // flows.forEach(function(d){
                //   timelineData[0].values.push({total: d.imp, year: new Date(d.year, 0, 1)})
                //   timelineData[1].values.push({total: d.exp, year: new Date(d.year, 0, 1)})
                // })
                
                update()
              },
              function(error) {
                console.log(error)
              	element.html(error);
              }
            )
  
          }

        var update = function(){
          chart.datum(timelineData).call(stacked)
        }

        // scope.$watchCollection('[entities.sourceEntity.selected, entities.targetEntity.selected]', function(newValue, oldValue){
        //   if(newValue != oldValue && newValue[0] && newValue[1]){
        //       scope.oldValues = oldValue
        //       init(newValue[0].RICid, newValue[1].RICid)
        //   }
        // }, true)

        /* start initialize */

        init()

        /* end initialize */

      }
    }
  }])
